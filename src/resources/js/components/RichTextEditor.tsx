import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = 'Start writing...', className = '' }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    rel: 'noopener noreferrer',
                    class: 'text-blue-500 hover:underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full',
                },
            }),
            Placeholder.configure({
                placeholder,
                emptyEditorClass: 'before:content-[attr(data-placeholder)] before:text-gray-400 before:float-left before:pointer-events-none before:h-0',
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editable: true,
        autofocus: true,
        editorProps: {
            attributes: {
                class: 'prose prose-sm focus:outline-none min-h-[200px] max-w-none w-full text-gray-900',
                spellcheck: 'false',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const handleFormatClick = (e: React.MouseEvent, callback: () => void) => {
        e.preventDefault(); // Prevent form submission
        callback();
        editor.chain().focus().run();
    };

    return (
        <div className={`w-full ${className}`}>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="border-b border-gray-300 bg-gray-50 p-2 overflow-x-auto">
                    <div className="flex gap-2 min-w-max">
                        <button
                            onClick={(e) => handleFormatClick(e, () => editor.chain().focus().toggleBold().run())}
                            className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                            title="Bold"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-4 h-4 text-gray-900">
                                <path fill="currentColor" d="M8 11h4.5a2.5 2.5 0 0 0 0-5H8v5Zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5ZM8 13v5h5.5a2.5 2.5 0 0 0 0-5H8Z"/>
                            </svg>
                        </button>
                        <button
                            onClick={(e) => handleFormatClick(e, () => editor.chain().focus().toggleItalic().run())}
                            className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                            title="Italic"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-4 h-4 text-gray-900">
                                <path fill="currentColor" d="m19 7-2 10H9l2-10h8ZM7 7l-2 10h2l2-10H7Z"/>
                            </svg>
                        </button>
                        <button
                            onClick={(e) => handleFormatClick(e, () => editor.chain().focus().toggleBulletList().run())}
                            className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                            title="Bullet List"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-4 h-4 text-gray-900">
                                <path fill="currentColor" d="M4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4-9h12v2H8V7Zm0 6h12v2H8v-2Zm0 6h12v2H8v-2Z"/>
                            </svg>
                        </button>
                        <button
                            onClick={(e) => handleFormatClick(e, () => editor.chain().focus().toggleOrderedList().run())}
                            className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                            title="Numbered List"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-4 h-4 text-gray-900">
                                <path fill="currentColor" d="M3 4h2v2H4v2H3V4Zm3 3h12v2H6V7Zm0 6h12v2H6v-2Zm0 6h12v2H6v-2ZM3 14h1v-1h1v1H4v2H3v-2Zm2-3H3v-2h2v2ZM4 20v-2h1v1h1v1H3v-2h1Z"/>
                            </svg>
                        </button>
                        <button
                            onClick={(e) => handleFormatClick(e, () => editor.chain().focus().toggleHeading({ level: 1 }).run())}
                            className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                            title="Heading 1"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-4 h-4 text-gray-900">
                                <path fill="currentColor" d="M13 20V4h-2v6H5V4H3v16h2v-8h6v8h2Z"/>
                            </svg>
                        </button>
                        <button
                            onClick={(e) => handleFormatClick(e, () => editor.chain().focus().toggleHeading({ level: 2 }).run())}
                            className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                            title="Heading 2"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-4 h-4 text-gray-900">
                                <path fill="currentColor" d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2Zm14.5 4a3.5 3.5 0 1 1 0-7H22v2h-3.5a1.5 1.5 0 1 0 0 3H22v2h-3.5a1.5 1.5 0 1 0 0 3H22v2h-3.5a3.5 3.5 0 1 1 0-7Z"/>
                            </svg>
                        </button>
                        <button
                            onClick={(e) => handleFormatClick(e, () => editor.chain().focus().toggleHeading({ level: 3 }).run())}
                            className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                            title="Heading 3"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-4 h-4 text-gray-900">
                                <path fill="currentColor" d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2Zm14.5 4a3.5 3.5 0 1 1 0-7H22v2h-3.5a1.5 1.5 0 1 0 0 3H20v2h-1.5a1.5 1.5 0 1 0 0 3H22v2h-3.5a3.5 3.5 0 1 1 0-7Z"/>
                            </svg>
                        </button>
                        <button
                            onClick={(e) => handleFormatClick(e, () => editor.chain().focus().toggleBlockquote().run())}
                            className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                            title="Quote"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-4 h-4 text-gray-900">
                                <path fill="currentColor" d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                            </svg>
                        </button>
                        <button
                            onClick={(e) => handleFormatClick(e, () => editor.chain().focus().toggleCodeBlock().run())}
                            className={`p-2 rounded ${editor.isActive('codeBlock') ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                            title="Code Block"
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="w-4 h-4 text-gray-900">
                                <path fill="currentColor" d="m8 18-6-6 6-6 1.425 1.425-4.6 4.6L9.4 16.6Zm8 0-1.425-1.425 4.6-4.6L14.6 7.4 16 6l6 6Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="p-4 min-h-[200px] bg-white">
                    <div className="prose prose-sm max-w-none text-gray-900">
                        <EditorContent editor={editor} />
                    </div>
                </div>
            </div>
        </div>
    );
} 