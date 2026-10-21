<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use RuntimeException;

/**
 * Writes the whole database as a gzipped .sql file using PHP only, so it works on hosts
 * without the mysqldump binary. Restore with: gunzip -c file.sql.gz | mysql <database>
 */
class DatabaseDumpService
{
    /**
     * Tables whose rows are temporary; their structure is kept, their rows are not.
     */
    private const STRUCTURE_ONLY = ['sessions', 'cache', 'cache_locks', 'jobs', 'job_batches', 'failed_jobs'];

    public function dump(string $path): void
    {
        $connection = DB::connection();

        if (! in_array($connection->getDriverName(), ['mysql', 'mariadb'], true)) {
            throw new RuntimeException('Database backups need MySQL or MariaDB.');
        }

        $file = gzopen($path, 'wb6');

        if ($file === false) {
            throw new RuntimeException('Could not create the database backup file.');
        }

        $pdo = $connection->getPdo();
        $write = fn (string $sql) => gzwrite($file, $sql);

        $write('-- Portfolio database backup, '.now()->toIso8601String()."\n");
        $write("SET NAMES utf8mb4;\nSET FOREIGN_KEY_CHECKS=0;\n\n");

        foreach (Schema::getTables() as $table) {
            $name = $table['name'];
            $create = (array) DB::selectOne('SHOW CREATE TABLE `'.$name.'`');

            $write("DROP TABLE IF EXISTS `{$name}`;\n".($create['Create Table'] ?? array_values($create)[1]).";\n\n");

            if (in_array($name, self::STRUCTURE_ONLY, true)) {
                continue;
            }

            $rows = [];
            $bytes = 0;

            foreach (DB::table($name)->cursor() as $row) {
                $rows[] = '('.implode(',', array_map(
                    fn ($value) => match (true) {
                        $value === null => 'NULL',
                        is_int($value) || is_float($value) => (string) $value,
                        // Binary data (uploaded files) is written as hex so the .sql file stays valid text
                        ! mb_check_encoding((string) $value, 'UTF-8') => '0x'.bin2hex((string) $value),
                        default => $pdo->quote((string) $value),
                    },
                    (array) $row,
                )).')';

                $bytes += strlen(end($rows));

                // Keep each statement small enough for MySQL's max_allowed_packet when restoring
                if (count($rows) === 200 || $bytes > 4 * 1024 * 1024) {
                    $write("INSERT INTO `{$name}` VALUES\n".implode(",\n", $rows).";\n");
                    $rows = [];
                    $bytes = 0;
                }
            }

            if ($rows !== []) {
                $write("INSERT INTO `{$name}` VALUES\n".implode(",\n", $rows).";\n");
            }

            $write("\n");
        }

        $write("SET FOREIGN_KEY_CHECKS=1;\n-- Dump completed\n");
        gzclose($file);
    }
}
