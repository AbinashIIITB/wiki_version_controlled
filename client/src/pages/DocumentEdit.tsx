import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MarkdownEditor from '../components/editor/MarkdownEditor';
import DiffViewer from '../components/editor/DiffViewer';
import { fetchDocument, updateDocument } from '../services/api';

const DocumentEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [document, setDocument] = useState<any>(null);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const loadDocument = async () => {
            try {
                const doc: any = await fetchDocument(id);
                setDocument(doc);
                setContent(doc.content);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadDocument();
    }, [id]);

    const handleSave = async () => {
        try {
            await updateDocument(id, { content });
            setIsEditing(false);
            history.push(`/documents/${id}`);
        } catch (err) {
            console.error(err);
            alert('Failed to save document modifications');
        }
    };

    if (isLoading) {
        return <div className="p-6 text-slate-400">Loading document editor...</div>;
    }

    if (!document) {
        return <div className="p-6 text-rose-400">Document not found.</div>;
    }

    return (
        <div className="document-edit p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">Edit: {document.title}</h1>
                <button
                    onClick={handleSave}
                    className="py-2.5 px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-xl focus:outline-none transition transform hover:-translate-y-0.5 duration-150"
                >
                    Save Changes
                </button>
            </div>
            
            <MarkdownEditor content={content} setContent={(val) => { setContent(val); setIsEditing(true); }} />
            
            <DiffViewer originalContent={document.content} editedContent={content} />
        </div>
    );
};

export default DocumentEdit;