import SET_DATA from "../actionType";

const initState = {
    searches: [
        {
            title: "Pakistan",
            description: "",
            phrase: "pakistan",
            id: 0,
        },
        {
            title: "Pakistan",
            description: "",
            phrase: "pakistan1",
            id: 1,
        },
        {
            title: "Pakistan",
            description: "",
            phrase: "pakistan2",
            id: 2,
        },
    ],
};

const dataReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                searches: action.payload,
            };

        default:
            return state;
    }
};

export default dataReducer;
