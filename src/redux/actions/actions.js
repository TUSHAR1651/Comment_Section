export const addComment = (comment) => ({
    type: 'ADD_COMMENT',
    payload: comment
});

export const deleteComment = (id) => ({
    type: 'DELETE_COMMENT',
    payload: id
});

export const editComment = (id, newComment) => ({
    type: 'EDIT_COMMENT',
    payload: { id, newComment }
});

export const addReply = (commentId, name, reply) => ({
    type: 'ADD_REPLY',
    payload: { commentId, reply: { name, reply } }
});

export const deleteReply = (commentId, replyIndex) => ({
    type: 'DELETE_REPLY',
    payload: { commentId, replyIndex }
});

export const editReply = (commentId, replyIndex, newReply) => ({
    type: 'EDIT_REPLY',
    payload: { commentId, replyIndex, newReply }
});
