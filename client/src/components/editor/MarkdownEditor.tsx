import React, { useState } from 'react';
import { Editor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useDebounce } from '../../hooks/useDebounce';
import { markdownToHtml, htmlToMarkdown } from '../../utils/markdown';

const MarkdownEditor = ({ initialValue, onChange }) => {
    const [editor] = useState(withReact(createEditor()));
    const [value, setValue] = useState(initialValue);
    const debouncedValue = useDebounce(value, 500);

    const handleChange = (newValue) => {
        setValue(newValue);
        onChange(newValue);
    };

    return (
        <Slate editor={editor} value={value} onChange={handleChange}>
            <Editable
                placeholder="Write your markdown here..."
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        // Handle enter key for new line or other actions
                    }
                }}
            />
        </Slate>
    );
};

export default MarkdownEditor;