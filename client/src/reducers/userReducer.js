import {FIND_PROFILE} from "../actions/userActions";

const initialState = {
    profile: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PROFILE:
            return {
                profile: action.profile
            };
        default:
            return state;
    }
};

export default userReducer;
