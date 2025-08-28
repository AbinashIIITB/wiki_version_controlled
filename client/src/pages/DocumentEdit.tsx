import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MarkdownEditor from '../components/editor/MarkdownEditor';
import LivePreview from '../components/editor/LivePreview';
import DiffViewer from '../components/editor/DiffViewer';
import { fetchDocument, updateDocument } from '../services/api';

const DocumentEdit = () => {
    const { id } = useParams();
    const history = useHistory();
    const [document, setDocument] = useState(null);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const loadDocument = async () => {
            const doc = await fetchDocument(id);
            setDocument(doc);
            setContent(doc.content);
            setIsLoading(false);
        };
        loadDocument();
    }, [id]);

    const handleSave = async () => {
        await updateDocument(id, { content });
        setIsEditing(false);
        history.push(`/documents/${id}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="document-edit">
            <h1>Edit Document: {document.title}</h1>
            <MarkdownEditor content={content} setContent={setContent} />
            <LivePreview content={content} />
            <DiffViewer originalContent={document.content} editedContent={content} />
            <button onClick={handleSave} disabled={!isEditing}>
                Save Changes
            </button>
        </div>
    );
};

export default DocumentEdit;