import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import InlineComment from './InlineComment';

const CommentThread: React.FC<{ documentId: string }> = ({ documentId }) => {
    const comments = useSelector((state: RootState) => state.documents.comments[documentId]) || [];

    return (
        <div className="comment-thread">
            <h3>Comments</h3>
            {comments.length === 0 ? (
                <p>No comments yet. Be the first to comment!</p>
            ) : (
                comments.map(comment => (
                    <div key={comment.id} className="comment">
                        <p><strong>{comment.author}</strong> - {new Date(comment.timestamp).toLocaleString()}</p>
                        <p>{comment.content}</p>
                        <InlineComment commentId={comment.id} />
                    </div>
                ))
            )}
        </div>
    );
};

export default CommentThread;