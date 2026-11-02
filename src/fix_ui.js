const fs = require('fs');

const fixPortfolio = () => {
    let content = fs.readFileSync('resources/js/pages/portfolio.tsx', 'utf-8');

    // Fix Code Snippet title truncation
    content = content.replace(
        /<div className="flex items-center space-x-2">\s*<h3 className="font-bold text-sm text-zinc-900 truncate">\{snip.title\}<\/h3>/g,
        '<div className="flex items-center space-x-2 min-w-0">\n                                                                <h3 className="font-bold text-sm text-zinc-900 truncate">{snip.title}</h3>'
    );

    // 1. Projects
    content = content.replace(
        /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">\s*\{projects.map\(project => \(\s*<a key=\{project.id\} href=\{project.url \|\| '#'\}/g,
        '<div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">\n                                    {projects.map(project => (\n                                        <a key={project.id} href={project.url || \'#\'} className="min-w-[85vw] snap-center md:min-w-0 md:w-auto group block h-full"'
    );
    // Remove the original className="group block h-full" from the replaced match's next lines.
    content = content.replace(
        /className="min-w-\[85vw\] snap-center md:min-w-0 md:w-auto group block h-full"([\s\S]*?)className="group block h-full"/g,
        'className="min-w-[85vw] snap-center md:min-w-0 md:w-auto group block h-full"$1'
    );

    // 2. API Integrations
    content = content.replace(
        /<div className="grid grid-cols-1 md:grid-cols-3 gap-6">\s*\{apiShowcaseItems.slice\(apiSliderIndex, apiSliderIndex \+ 3\).map\(api => \{\s*return \(\s*<div key=\{api.name\} className="flex flex-col bg-stone-900 border/g,
        '<div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 md:grid md:grid-cols-3 md:overflow-visible">\n                                    {apiShowcaseItems.slice(apiSliderIndex, apiSliderIndex + 3).map(api => {\n                                        return (\n                                            <div key={api.name} className="min-w-[85vw] snap-center md:min-w-0 md:w-auto flex flex-col bg-stone-900 border'
    );

    // 3. Code Snippets
    content = content.replace(
        /<div className="grid grid-cols-1 md:grid-cols-3 gap-6">\s*\{filteredSnippets.slice\(snippetSliderIndex, snippetSliderIndex \+ 3\).map\(snip => \(\s*<div key=\{snip.id\} className="border border-zinc-200/g,
        '<div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 md:grid md:grid-cols-3 md:overflow-visible">\n                                            {filteredSnippets.slice(snippetSliderIndex, snippetSliderIndex + 3).map(snip => (\n                                                <div key={snip.id} className="min-w-[85vw] snap-center md:min-w-0 md:w-auto border border-zinc-200'
    );

    // 4. Blog
    content = content.replace(
        /<div className="grid grid-cols-1 md:grid-cols-3 gap-6">\s*\{blogPosts.slice\(blogSliderIndex, blogSliderIndex \+ 3\).map\(post => \(\s*<Link href=\{\`\/insights\/\$\{post.slug\}\`\} key=\{post.id\} className="group block bg-white/g,
        '<div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 md:grid md:grid-cols-3 md:overflow-visible">\n                                        {blogPosts.slice(blogSliderIndex, blogSliderIndex + 3).map(post => (\n                                            <Link href={`/insights/${post.slug}`} key={post.id} className="min-w-[85vw] snap-center md:min-w-0 md:w-auto group block bg-white'
    );

    // 5. Toolkit (slider)
    content = content.replace(
        /<div className="grid grid-cols-1 md:grid-cols-3 gap-6">\s*\{filteredResources.slice\(resourceSliderIndex, resourceSliderIndex \+ 3\).map\(res => \(\s*<button\s*type="button"\s*key=\{res.id\}\s*onClick=\{\(\) => setActiveResource\(res\)\}\s*className="group block border/g,
        '<div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 md:grid md:grid-cols-3 md:overflow-visible">\n                                        {filteredResources.slice(resourceSliderIndex, resourceSliderIndex + 3).map(res => (\n                                            <button\n                                                type="button"\n                                                key={res.id}\n                                                onClick={() => setActiveResource(res)}\n                                                className="min-w-[85vw] snap-center md:min-w-0 md:w-auto group block text-left border'
    );

    // Bottom Navigation Logic
    // Remove hamburger menu
    content = content.replace(
        /\{\/\* Mobile menu toggle \*\/\}([\s\S]*?)<\/button>/,
        ''
    );
    // Remove dropdown
    content = content.replace(
        /\{\/\* Mobile menu dropdown \*\/\}([\s\S]*?)(?=<\/header>)/,
        ''
    );

    // Add padding to main
    content = content.replace(
        /<main className="pt-24 pb-32">/,
        '<main className="pt-24 pb-32 md:pb-32 pb-40">'
    );

    // Add bottom nav bar before closing div
    const bottomNav = `
                {/* Mobile Bottom Navigation */}
                <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-zinc-200 z-50 md:hidden flex justify-around items-center px-2 py-3 pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
                    <Link href="/" className="flex flex-col items-center p-2 text-zinc-500 hover:text-amber-600">
                        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        <span className="text-[10px] font-medium">Home</span>
                    </Link>
                    <Link href="/#projects" className="flex flex-col items-center p-2 text-zinc-500 hover:text-amber-600">
                        <Briefcase className="w-5 h-5 mb-1" />
                        <span className="text-[10px] font-medium">Work</span>
                    </Link>
                    <Link href="/#snippets" className="flex flex-col items-center p-2 text-zinc-500 hover:text-amber-600">
                        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                        <span className="text-[10px] font-medium">Code</span>
                    </Link>
                    <Link href="/#blog" className="flex flex-col items-center p-2 text-zinc-500 hover:text-amber-600">
                        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                        <span className="text-[10px] font-medium">Blog</span>
                    </Link>
                </nav>
`;
    content = content.replace(
        /<\/div>\s*<\/>\s*\);\s*\}/,
        bottomNav + '\n            </div>\n        </>\n    );\n}'
    );

    fs.writeFileSync('resources/js/pages/portfolio.tsx', content);
}

const fixArticle = (file) => {
    let content = fs.readFileSync(file, 'utf-8');
    // Remove hamburger menu
    content = content.replace(
        /\{\/\* Mobile menu toggle \*\/\}([\s\S]*?)<\/button>/,
        ''
    );
    // Remove dropdown
    content = content.replace(
        /\{\/\* Mobile menu dropdown \*\/\}([\s\S]*?)(?=<\/header>)/,
        ''
    );
    // Add padding to main
    content = content.replace(
        /<main className="pt-24 pb-32">/,
        '<main className="pt-24 pb-32 md:pb-32 pb-40">'
    );
    const bottomNav = `
                {/* Mobile Bottom Navigation */}
                <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-zinc-200 z-50 md:hidden flex justify-around items-center px-2 py-3 pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
                    <Link href="/" className="flex flex-col items-center p-2 text-zinc-500 hover:text-amber-600">
                        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        <span className="text-[10px] font-medium">Home</span>
                    </Link>
                    <Link href="/#projects" className="flex flex-col items-center p-2 text-zinc-500 hover:text-amber-600">
                        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        <span className="text-[10px] font-medium">Work</span>
                    </Link>
                    <Link href="/#snippets" className="flex flex-col items-center p-2 text-zinc-500 hover:text-amber-600">
                        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                        <span className="text-[10px] font-medium">Code</span>
                    </Link>
                    <Link href="/#blog" className="flex flex-col items-center p-2 text-zinc-500 hover:text-amber-600">
                        <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                        <span className="text-[10px] font-medium">Blog</span>
                    </Link>
                </nav>
`;
    content = content.replace(
        /<\/div>\s*<\/>\s*\);\s*\}/,
        bottomNav + '\n            </div>\n        </>\n    );\n}'
    );
    fs.writeFileSync(file, content);
}

fixPortfolio();
fixArticle('resources/js/pages/article.tsx');
fixArticle('resources/js/pages/showcase.tsx');
