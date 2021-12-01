import axios from "axios";

const BASE_URL = "http://localhost:9009/api/v1/";

axios.defaults.baseURL = BASE_URL;

export const postDataWithAuth = async (url, body) => {
    setApiHeader();
    try {
        const response = await axios.post(url, body);
        return {
            data: response,
            isError: false,
        };
    } catch (exp) {
        return {
            error: exp,
            isError: true,
        };
    }
};

export const putDataWithAuth = async (url, body) => {
    setApiHeader();
    try {
        const response = await axios.put(url, body);
        return {
            data: response,
            isError: false,
        };
    } catch (exp) {
        return {
            error: exp,
            isError: true,
        };
    }
};

export const getDataWithAuth = async (url) => {
    setApiHeader();
    try {
        const response = await axios.get(url);
        return {
            data: response,
            isError: false,
        };
    } catch (exp) {
        return {
            error: exp,
            isError: true,
        };
    }
};

export const deleteDataWithAuth = async (url, body) => {
    setApiHeader();
    try {
        const response = await axios.delete(url, body);
        return {
            data: response,
            isError: false,
        };
    } catch (exp) {
        return {
            error: exp,
            isError: true,
        };
    }
};

const setApiHeader = () => {
    const token = "";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
