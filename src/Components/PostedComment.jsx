import React, { useState } from 'react';
import Modal from 'react-modal';
import Reply from './Reply';

// Set the app element for accessibility
Modal.setAppElement('#root');

function PostedComment({ commentId, Name, Comment, DateTime, onDelete, onEdit, replies, addReply, deleteReply, editReply }) {
    const [reply, setReply] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editComment, setEditComment] = useState(Comment);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function postReply() {
        if (name && reply) {
            addReply(commentId, name, reply);
            setReply('');
            setName('');
            closeModal();
        }
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleReplyChange(event) {
        setReply(event.target.value);
    }

    function handleEditClick() {
        setIsEditing(true);
    }

    function handleEditChange(event) {
        setEditComment(event.target.value);
    }

    function handleSaveEdit() {
        onEdit(editComment);
        setIsEditing(false);
    }

    function handleCancelEdit() {
        setEditComment(Comment);
        setIsEditing(false);
    }

    return (
        <div className="posted-comment-container">
            <div className="posted-comment-header">
                <h3 className="posted-comment-author">{Name}</h3>
                <div>
                    <p className="posted-comment-date">{DateTime}</p>
                    <button className="delete-button" onClick={onDelete}>Delete</button>
                </div>
            </div>
            {isEditing ? (
                <div>
                    <textarea
                        value={editComment}
                        onChange={handleEditChange}
                        className="edit-textarea"
                    />
                    <button onClick={handleSaveEdit} className="modal-button">Save</button>
                    <button onClick={handleCancelEdit} className="modal-button">Cancel</button>
                </div>
            ) : (
                <p className="posted-comment-text">{Comment}</p>
            )}
            <div className="reply-section">
                <button onClick={openModal} className="reply-button">Reply</button>
                <button onClick={handleEditClick} className="edit-button">Edit</button>
            </div>

            <div className="replies-list">
                {replies.map((r, index) => (
                    <Reply
                        key={index}
                        name={r.name}
                        reply={r.reply}
                        dateTime={r.dateTime}
                        onDelete={() => deleteReply(commentId, index)}
                        onEdit={(newReply) => editReply(commentId, index, newReply)}
                    />
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Reply Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>Reply to {Name}</h2>
                <textarea
                    placeholder="Write your name here..."
                    onChange={handleNameChange}
                    className="modal-new"
                    value={name}
                />
                <textarea
                    placeholder="Write your reply here..."
                    value={reply}
                    onChange={handleReplyChange}
                    className="modal-textarea"
                />
                <button onClick={postReply} className="modal-button">Post Reply</button>
                <button onClick={closeModal} className="modal-button">Cancel</button>
            </Modal>
        </div>
    );
}

export default PostedComment;
