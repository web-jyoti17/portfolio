import { useEffect, useRef } from 'react';

type ArticleContentProps = {
    html: string;
    className?: string;
};

export const slugifyHeading = (text: string): string =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const BULLET = /^(?:#|-|\*|•)\s+/;

/** Lines that all start with a bullet marker ("# ", "- ", "• ") become a real list. */
const linesToList = (text: string): string | null => {
    const lines = text
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean);

    if (lines.length < 2 || !lines.every((line) => BULLET.test(line))) {
        return null;
    }

    return `<ul>${lines.map((line) => `<li>${line.replace(BULLET, '')}</li>`).join('')}</ul>`;
};

/**
 * Content typed into plain admin fields often arrives as loose text: bullet points
 * written as "# item" lines, or paragraphs separated by blank lines. Turn that into
 * proper lists and paragraphs so it reads the way it was meant to.
 */
export const tidyHtml = (html: string | null | undefined): string => {
    const source = (html || '').trim();

    if (source === '') {
        return '';
    }

    if (!/<[a-z][\s\S]*>/i.test(source)) {
        return (
            linesToList(source) ??
            source
                .split(/\n{2,}/)
                .map((paragraph) => `<p>${paragraph.trim().replace(/\n/g, '<br>')}</p>`)
                .join('')
        );
    }

    return source.replace(/<p>([^<]*)<\/p>/g, (paragraph, text: string) => linesToList(text) ?? paragraph);
};

/**
 * Renders article HTML saved by the admin editor and makes it comfortable to read:
 * headings get ids (for the table of contents), code blocks get a copy button,
 * wide tables scroll sideways instead of breaking the page on phones.
 */
export function ArticleContent({ html, className = '' }: ArticleContentProps) {
    const container = useRef<HTMLDivElement>(null);
    const content = tidyHtml(html);

    useEffect(() => {
        const root = container.current;

        if (!root) {
            return;
        }

        const usedIds = new Set<string>();

        root.querySelectorAll<HTMLElement>('h2, h3').forEach((heading) => {
            let id = slugifyHeading(heading.textContent ?? '') || 'section';

            while (usedIds.has(id)) {
                id = `${id}-2`;
            }

            usedIds.add(id);
            heading.id = id;
        });

        root.querySelectorAll<HTMLPreElement>('pre').forEach((pre) => {
            if (pre.parentElement?.classList.contains('code-block')) {
                return;
            }

            const wrapper = document.createElement('div');
            const button = document.createElement('button');

            wrapper.className = 'code-block';
            button.type = 'button';
            button.className = 'code-copy';
            button.textContent = 'Copy';
            button.addEventListener('click', () => {
                navigator.clipboard.writeText(pre.innerText).then(() => {
                    button.textContent = 'Copied';
                    setTimeout(() => (button.textContent = 'Copy'), 1800);
                });
            });

            pre.replaceWith(wrapper);
            wrapper.append(pre, button);
        });

        root.querySelectorAll<HTMLTableElement>('table').forEach((table) => {
            if (table.parentElement?.classList.contains('table-scroll')) {
                return;
            }

            const wrapper = document.createElement('div');

            wrapper.className = 'table-scroll';
            table.replaceWith(wrapper);
            wrapper.append(table);
        });

        root.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
            image.loading = 'lazy';
            image.decoding = 'async';
        });

        root.querySelectorAll<HTMLAnchorElement>('a[href^="http"]').forEach((link) => {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        });
    }, [content]);

    return <div ref={container} className={`article-content ${className}`} dangerouslySetInnerHTML={{ __html: content }} />;
}
