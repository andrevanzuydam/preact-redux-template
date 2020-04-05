import { UPDATE_COUNTER, UPDATE_PROFILE } from "../actions";

const initialState = {
    userSession: {email: 'test@test.com', username: 'test', token: null, counter: 0}
};

function rootReducer(state = initialState, action) {
    console.log ('rootReducer State', state, action.payload);
    switch (action.type) {
        case UPDATE_COUNTER:
            state.userSession.counter = action.payload.counter;
        break;
        case UPDATE_PROFILE:
            state.userSession.email = action.payload.email;
            state.userSession.username = action.payload.username;
        break;
    }
    return state;
};

export default rootReducer;