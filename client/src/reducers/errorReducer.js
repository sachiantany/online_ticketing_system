import { GET_ERRORS,CLEAR_ERRORS} from "../actions/types";

const initialState = {
    msg: {},
    state: null,
    id: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg: action.payload.msg,
                state: action.payload.status,
                id: action.payload.id
            };
        case CLEAR_ERRORS:
            return {
                msg: {},
                state: null,
                id: null
            };
        default:
            return state;
    }
}