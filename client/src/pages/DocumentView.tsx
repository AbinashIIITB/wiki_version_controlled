import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDocument, fetchDocumentVersions } from '../services/api';
import DiffViewer from '../components/editor/DiffViewer';
import CommentThread from '../components/comments/CommentThread';

const DocumentView = () => {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDocument = async () => {
            try {
                const doc = await fetchDocument(id);
                setDocument(doc);
                const docVersions = await fetchDocumentVersions(id);
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
        return <div>Loading...</div>;
    }

    return (
        <div className="document-view">
            <h1>{document.title}</h1>
            <div className="document-content" dangerouslySetInnerHTML={{ __html: document.content }} />
            <h2>Versions</h2>
            {versions.map(version => (
                <DiffViewer key={version.id} version={version} />
            ))}
            <CommentThread documentId={id} />
        </div>
    );
};

export default DocumentView;