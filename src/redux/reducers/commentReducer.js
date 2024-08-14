const initialState = {
    comments: []
};

function commentsReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_COMMENT':
            return {
                ...state,
                comments: [...state.comments, action.payload]
            };
        case 'DELETE_COMMENT':
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.payload)
            };
        case 'EDIT_COMMENT':
            return {
                ...state,
                comments: state.comments.map(comment =>
                    comment.id === action.payload.id
                        ? { ...comment, comment: action.payload.newComment }
                        : comment
                )
            };
        case 'ADD_REPLY':
            return {
                ...state,
                comments: state.comments.map(comment =>
                    comment.id === action.payload.commentId
                        ? { ...comment, replies: [...comment.replies, action.payload.reply] }
                        : comment
                )
            };
        case 'DELETE_REPLY':
            return {
                ...state,
                comments: state.comments.map(comment =>
                    comment.id === action.payload.commentId
                        ? { ...comment, replies: comment.replies.filter((_, index) => index !== action.payload.replyIndex) }
                        : comment
                )
            };
        case 'EDIT_REPLY':
            return {
                ...state,
                comments: state.comments.map(comment =>
                    comment.id === action.payload.commentId
                        ? {
                            ...comment,
                            replies: comment.replies.map((reply, index) =>
                                index === action.payload.replyIndex
                                    ? { ...reply, reply: action.payload.newReply }
                                    : reply
                            )
                        }
                        : comment
                )
            };
        case 'UPDATE_COMMENTS':
            return {
                ...state,
                comments: action.payload
            };
        default:
            return state;
    }
}

export default commentsReducer;
