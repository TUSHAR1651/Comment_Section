import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteReply, editReply } from '../redux/actions/actions';

function Reply({ commentId, reply, replyIndex }) {
  const [replyText, setReplyText] = useState(reply.reply);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (isEditing) {
      dispatch(editReply(commentId, replyIndex, replyText));
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    dispatch(deleteReply(commentId, replyIndex));
  };

  return (
    <div className="reply">
      <p><strong>{reply.name}</strong> ({reply.dateTime}):</p>
      {isEditing ? (
        <div>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </div>
      ) : (
        <p>{reply.reply}</p>
      )}
      <button onClick={handleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Reply;
