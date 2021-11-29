import SET_DATA from "../actionType";

const setData = (data) => {
    return {
        type: SET_DATA,
        payload: data,
    };
};

export default setData;
