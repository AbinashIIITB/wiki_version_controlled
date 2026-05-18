import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDocument, fetchDocumentVersions } from '../services/api';
import DiffViewer from '../components/editor/DiffViewer';
import CommentThread from '../components/comments/CommentThread';

const DocumentView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [document, setDocument] = useState<any>(null);
    const [versions, setVersions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDocument = async () => {
            try {
                const doc = await fetchDocument(id);
                setDocument(doc);
                const docVersions: any = await fetchDocumentVersions(id);
                setVersions(docVersions);
            } catch (error) {
                console.error('Error fetching document:', error);
            } finally {
                setLoading(false);
            }
        };

        getDocument();
    }, [id]);

    if (loading) {
        return <div className="p-6 text-slate-400">Loading document...</div>;
    }

    if (!document) {
        return <div className="p-6 text-rose-400">Document not found.</div>;
    }

    return (
        <div className="document-view p-6 max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-extrabold text-white tracking-tight">{document.title}</h1>
                <div className="text-sm text-slate-400">Created: {new Date(document.createdAt).toLocaleString()}</div>
            </div>
            
            <div 
                className="document-content p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-slate-200 max-w-none" 
                dangerouslySetInnerHTML={{ __html: document.content }} 
            />
            
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Revision History</h2>
                {versions && versions.length > 0 ? (
                    versions.map((version: any) => (
                        <DiffViewer key={version.id} version={version} />
                    ))
                ) : (
                    <p className="text-slate-500">No revisions recorded yet.</p>
                )}
            </div>

            <CommentThread documentId={id} />
        </div>
    );
};

export default DocumentView;