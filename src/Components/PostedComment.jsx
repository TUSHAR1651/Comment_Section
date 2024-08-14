import React, { useState } from 'react';

function PostedComment({
    commentId,
    Name,
    Comment,
    DateTime,
    replies,
    onDelete,
    onEdit,
    addReply,
    deleteReply,
    editReply
}) {
    const [replyName, setReplyName] = useState('');
    const [replyText, setReplyText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editedReply, setEditedReply] = useState('');

    const handleAddReply = () => {
        if (replyName && replyText) {
            addReply(replyName, replyText);
            setReplyName('');
            setReplyText('');
        }
    };

    const handleSaveEdit = () => {
        if (editedComment) {
            onEdit(editedComment);
            setIsEditing(false);
            setEditedComment('');
        }
    };

    return (
        <div className='posted-comment-container'>
            <div className='posted-comment-header'>
                <h4 className='posted-comment-author'>{Name}</h4>
                <div className='date-delete-container'>
                    <p className='posted-comment-date'>{DateTime}</p>
                    <button className='delete-button' onClick={onDelete}>Delete</button>
                </div>
            </div>
            {isEditing ? (
                <div className='edit-comment-area'>
                    <textarea
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <button className='modal-button' onClick={handleSaveEdit}>Save</button>
                    <button className='modal-button' onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <>
                    <p className='posted-comment-text'>{Comment}</p>
                    <p className='edit-button' onClick={() => {
                        setIsEditing(true);
                        setEditedComment(Comment);
                    }}>Edit</p>
                </>
            )}
            <div className='reply-section'>
                <input
                    type='text'
                    placeholder='Name'
                    value={replyName}
                    onChange={(e) => setReplyName(e.target.value)}
                    className='reply-name'
                />
                <textarea
                    placeholder='Reply'
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className='reply-textarea'
                />
                <button className='reply-button' onClick={handleAddReply}>Reply</button>
                <div className='replies-list'>
                    {replies.map((reply, index) => (
                        <div key={index} className='reply-item'>
                            <h4>{reply.name}</h4>
                            <p>{reply.reply}</p>
                            <button className='delete-button' onClick={() => deleteReply(index)}>Delete Reply</button>
                            <button className='edit-button' onClick={() => {
                                setEditIndex(index);
                                setEditedReply(reply.reply);
                            }}>Edit Reply</button>
                            {editIndex === index && (
                                <div className='reply-edit-area'>
                                    <textarea
                                        value={editedReply}
                                        onChange={(e) => setEditedReply(e.target.value)}
                                    />
                                    <button className='modal-button' onClick={() => {
                                        editReply(index, editedReply);
                                        setEditIndex(null);
                                        setEditedReply('');
                                    }}>Save</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PostedComment;
