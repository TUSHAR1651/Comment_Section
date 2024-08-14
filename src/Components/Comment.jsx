import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, deleteComment, editComment, addReply, deleteReply, editReply } from '../redux/actions/actions';
import PostedComment from './PostedComment';
import './Comment.css';

function Comment() {
    const dispatch = useDispatch();
    
    const comments = useSelector(state => state.comments.comments || []);
    console.log(comments); 

    const [name, setName] = React.useState('');
    const [comment, setComment] = React.useState('');

    function post() {
        if (name && comment) {
            const currentDateTime = new Date().toLocaleString();
            dispatch(addComment({
                id: Date.now(),  
                name,
                comment,
                dateTime: currentDateTime,
                replies: []
            }));
            setName('');
            setComment('');
        }
    }

    function sort() {
        const sortedComments = [...comments].sort((a, b) =>
            new Date(b.dateTime) - new Date(a.dateTime)
        );
        dispatch({ type: 'UPDATE_COMMENTS', payload: sortedComments });
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
                    {comments.map((c) => (
                        <PostedComment
                            key={c.id}
                            commentId={c.id}
                            Name={c.name}
                            Comment={c.comment}
                            DateTime={c.dateTime}
                            replies={c.replies}
                            onDelete={() => dispatch(deleteComment(c.id))}
                            onEdit={(newComment) => dispatch(editComment(c.id, newComment))}
                            addReply={(name, reply) => dispatch(addReply(c.id, name, reply))}
                            deleteReply={(replyIndex) => dispatch(deleteReply(c.id, replyIndex))}
                            editReply={(replyIndex, newReply) => dispatch(editReply(c.id, replyIndex, newReply))}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Comment;
