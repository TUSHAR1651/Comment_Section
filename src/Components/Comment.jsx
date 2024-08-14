import React, { useState } from 'react';
import PostedComment from './PostedComment';
import './Comment.css';

let commentIdCounter = 0;

function Comment() {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    function post() {
        if (name && comment) {
            const currentDateTime = new Date().toLocaleString();
            setComments([
                ...comments,
                {
                    id: commentIdCounter++,  // Generate a unique ID for each comment
                    name,
                    comment,
                    dateTime: currentDateTime,
                    replies: []
                }
            ]);
            setName('');
            setComment('');
        }
    }

    function sort() {
        const sortedComments = [...comments].sort((a, b) =>
            new Date(b.dateTime) - new Date(a.dateTime)
        );
        setComments(sortedComments);
    }

    function deleteComment(index) {
        setComments(comments.filter((_, i) => i !== index));
    }

    function editComment(index, newComment) {
        const updatedComments = comments.map((c, i) =>
            i === index ? { ...c, comment: newComment } : c
        );
        setComments(updatedComments);
    }

    function addReply(commentId, name, reply) {
        const currentDateTime = new Date().toLocaleString();
        const updatedComments = comments.map((c) =>
            c.id === commentId
                ? { ...c, replies: [...c.replies, { name, reply, dateTime: currentDateTime, commentId }] }
                : c
        );
        setComments(updatedComments);
    }

    function deleteReply(commentId, replyIndex) {
        const updatedComments = comments.map((c) =>
            c.id === commentId
                ? { ...c, replies: c.replies.filter((_, j) => j !== replyIndex) }
                : c
        );
        setComments(updatedComments);
    }

    function editReply(commentId, replyIndex, newReply) {
        const updatedComments = comments.map((c) =>
            c.id === commentId
                ? {
                    ...c, replies: c.replies.map((r, j) =>
                        j === replyIndex ? { ...r, reply: newReply } : r
                    )
                }
                : c
        );
        setComments(updatedComments);
    }

    return (
        <div className='outer'>
            <div className='comment'>
                <h3>Comment</h3>
                <div className='input'>
                    <input
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='Comment'
                        className='comment1'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div className='new'>
                    <button onClick={post}>Post</button>
                    <button onClick={sort}>Sort</button>
                </div>
                <div className='posted-comments'>
                    {comments.map((c, index) => (
                        <PostedComment
                            key={c.id}
                            commentId={c.id}
                            Name={c.name}
                            Comment={c.comment}
                            DateTime={c.dateTime}
                            replies={c.replies}
                            onDelete={() => deleteComment(index)}
                            onEdit={(newComment) => editComment(index, newComment)}
                            addReply={addReply}
                            deleteReply={(replyIndex) => deleteReply(c.id, replyIndex)}
                            editReply={(replyIndex, newReply) => editReply(c.id, replyIndex, newReply)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Comment;
