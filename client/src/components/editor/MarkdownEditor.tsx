import React, { useState, useEffect } from 'react';

interface MarkdownEditorProps {
    content?: string;
    setContent?: (value: string) => void;
    initialValue?: string;
    onChange?: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ content, setContent, initialValue, onChange }) => {
    const [value, setValue] = useState(content !== undefined ? content : (initialValue || ''));

    useEffect(() => {
        if (content !== undefined) {
            setValue(content);
        }
    }, [content]);

    const handleTextChange = (val: string) => {
        setValue(val);
        if (setContent) setContent(val);
        if (onChange) onChange(val);
    };

    const insertFormat = (formatType: string) => {
        const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selected = text.substring(start, end);

        let replacement = '';
        switch (formatType) {
            case 'bold':
                replacement = `**${selected || 'bold text'}**`;
                break;
            case 'italic':
                replacement = `*${selected || 'italic text'}*`;
                break;
            case 'code':
                replacement = `\`\`\`\n${selected || 'code block'}\n\`\`\``;
                break;
            case 'link':
                replacement = `[${selected || 'link text'}](url)`;
                break;
            case 'list':
                replacement = `\n- ${selected || 'list item'}`;
                break;
            default:
                return;
        }

        const newValue = text.substring(0, start) + replacement + text.substring(end);
        handleTextChange(newValue);
        
        // Focus and select back
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + replacement.length, start + replacement.length);
        }, 50);
    };

    return (
        <div className="markdown-editor w-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden">
            {/* Rich Editor Toolbar */}
            <div className="flex items-center space-x-2 p-2 bg-slate-950/40 border-b border-white/10">
                <button
                    type="button"
                    onClick={() => insertFormat('bold')}
                    className="p-2 hover:bg-white/10 rounded-lg text-slate-300 font-bold transition text-sm"
                    title="Bold"
                >
                    B
                </button>
                <button
                    type="button"
                    onClick={() => insertFormat('italic')}
                    className="p-2 hover:bg-white/10 rounded-lg text-slate-300 italic transition text-sm"
                    title="Italic"
                >
                    I
                </button>
                <button
                    type="button"
                    onClick={() => insertFormat('code')}
                    className="p-2 hover:bg-white/10 rounded-lg text-slate-300 font-mono transition text-sm"
                    title="Code Block"
                >
                    &lt;/&gt;
                </button>
                <button
                    type="button"
                    onClick={() => insertFormat('link')}
                    className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition text-sm"
                    title="Insert Link"
                >
                    🔗
                </button>
                <button
                    type="button"
                    onClick={() => insertFormat('list')}
                    className="p-2 hover:bg-white/10 rounded-lg text-slate-300 transition text-sm"
                    title="Bullet List"
                >
                    • List
                </button>
            </div>
            
            <textarea
                id="markdown-textarea"
                value={value}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Write your markdown here..."
                className="w-full h-80 px-4 py-3 bg-transparent text-white font-mono text-sm placeholder-slate-500 focus:outline-none resize-y transition"
            />
        </div>
    );
};

export default MarkdownEditor;