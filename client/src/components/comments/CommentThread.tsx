import React, { useEffect, useState } from 'react';
import { fetchCommentsByDocumentId, addComment } from '../../services/api';
import InlineComment from './InlineComment';

interface Comment {
    id: number;
    content: string;
    createdAt: string;
    author?: { username: string };
}

const CommentThread: React.FC<{ documentId: string }> = ({ documentId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [loading, setLoading] = useState(true);

    const loadComments = async () => {
        try {
            const data: any = await fetchCommentsByDocumentId(documentId);
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadComments();
    }, [documentId]);

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;

        try {
            await addComment(documentId, { content: newCommentText });
            setNewCommentText('');
            loadComments(); // Refresh comments list
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Failed to submit comment');
        }
    };

    if (loading) {
        return <div className="text-slate-400 text-sm">Loading comments...</div>;
    }

    return (
        <div className="comment-thread space-y-6 mt-8">
            <h3 className="text-2xl font-bold text-white">Discussion</h3>
            
            {/* New Comment Form */}
            <form onSubmit={handleSubmitComment} className="space-y-3">
                <textarea
                    rows={3}
                    placeholder="Add to the discussion..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                />
                <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl focus:outline-none transition transform hover:-translate-y-0.5"
                >
                    Post Comment
                </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-slate-500 text-sm italic">No comments yet. Be the first to comment!</p>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <InlineComment 
                                comment={comment.content} 
                                author={comment.author?.username || 'Wiki Contributor'} 
                                timestamp={new Date(comment.createdAt).toLocaleString()} 
                                onDelete={() => {}} // Local mock delete placeholder
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentThread;