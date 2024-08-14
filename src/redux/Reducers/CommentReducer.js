import {
    ADD_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    ADD_REPLY,
    DELETE_REPLY,
    EDIT_REPLY,
    SORT_COMMENTS
} from '../actions/actions';

const initialState = {
    comments: [],
    commentIdCounter: 0
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT: {
            const { name, comment, dateTime } = action.payload;
            return {
                ...state,
                comments: [
                    ...state.comments,
                    {
                        id: state.commentIdCounter,
                        name,
                        comment,
                        dateTime,
                        replies: []
                    }
                ],
                commentIdCounter: state.commentIdCounter + 1
            };
        }

        case DELETE_COMMENT: {
            const index = action.payload;
            return {
                ...state,
                comments: state.comments.filter((_, i) => i !== index)
            };
        }

        case EDIT_COMMENT: {
            const { index, newComment } = action.payload;
            return {
                ...state,
                comments: state.comments.map((c, i) =>
                    i === index ? { ...c, comment: newComment } : c
                )
            };
        }

        case ADD_REPLY: {
            const { commentId, name, reply, dateTime } = action.payload;
            return {
                ...state,
                comments: state.comments.map(c =>
                    c.id === commentId
                        ? { ...c, replies: [...c.replies, { name, reply, dateTime, commentId }] }
                        : c
                )
            };
        }

        case DELETE_REPLY: {
            const { commentId, replyIndex } = action.payload;
            return {
                ...state,
                comments: state.comments.map(c =>
                    c.id === commentId
                        ? { ...c, replies: c.replies.filter((_, j) => j !== replyIndex) }
                        : c
                )
            };
        }

        case EDIT_REPLY: {
            const { commentId, replyIndex, newReply } = action.payload;
            return {
                ...state,
                comments: state.comments.map(c =>
                    c.id === commentId
                        ? {
                            ...c,
                            replies: c.replies.map((r, j) =>
                                j === replyIndex ? { ...r, reply: newReply } : r
                            )
                        }
                        : c
                )
            };
        }

        case SORT_COMMENTS: {
            return {
                ...state,
                comments: [...state.comments].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
            };
        }

        default:
            return state;
    }
};

export default commentReducer;
