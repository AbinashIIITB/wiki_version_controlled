import React, { useState } from 'react';

interface InlineCommentProps {
  comment: string;
  author: string;
  timestamp: string;
  onDelete: () => void;
}

const InlineComment: React.FC<InlineCommentProps> = ({ comment, author, timestamp, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Logic to save the edited comment
    setIsEditing(false);
  };

  return (
    <div className="inline-comment">
      <div className="comment-header">
        <span className="comment-author">{author}</span>
        <span className="comment-timestamp">{timestamp}</span>
        <button onClick={onDelete} className="delete-button">Delete</button>
        <button onClick={handleEdit} className="edit-button">Edit</button>
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
          <button onClick={handleSave} className="save-button">Save</button>
        </div>
      ) : (
        <p className="comment-text">{comment}</p>
      )}
    </div>
  );
};

export default InlineComment;