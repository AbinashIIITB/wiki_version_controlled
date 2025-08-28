import React from 'react';

interface LivePreviewProps {
    content: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({ content }) => {
    return (
        <div className="live-preview">
            <h2>Live Preview</h2>
            <div
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

export default LivePreview;