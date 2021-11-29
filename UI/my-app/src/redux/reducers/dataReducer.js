import SET_DATA from "../actionType";

const initState = {
    test: {},
};

const dataReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                test: action.payload,
            };

        default:
            return state;
    }
};

export default dataReducer;
