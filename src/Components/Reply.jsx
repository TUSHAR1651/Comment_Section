import React, { useState } from 'react';

function Reply({ name, reply, dateTime, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReply, setEditedReply] = useState(reply);

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
    setEditedReply(reply);
  }

  function handleSave() {
    if (editedReply.trim()) { // Ensure that the reply is not empty
      onEdit(editedReply);
      setIsEditing(false);
    } else {
      // Handle empty reply case (optional: show an error message)
      alert('Reply cannot be empty');
    }
  }

  function handleChange(event) {
    setEditedReply(event.target.value);
  }

  return (
    <div className="reply-item">
      <h4>{name}</h4>
      <p>{dateTime}</p>
      {isEditing ? (
        <div>
          <textarea
            value={editedReply}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{reply}</p>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Reply;
