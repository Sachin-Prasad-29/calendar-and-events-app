import axios from 'axios';

const getAllTodos = async () => {
    const token = localStorage.getItem('token');
    const reqData = {
        method: 'get',
        url: `todo`,
        headers: {
            Authorization: token,
        },
    };
    try {
        const response = await axios(reqData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
const addTodo = async (data) => {
    const token = localStorage.getItem('token');
    const reqData = {
        method: 'post',
        url: `todo`,
        headers: {
            Authorization: token,
        },
        data,
    };
    try {
        const response = await axios(reqData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
const editTodo = async (id, data) => {
    const token = localStorage.getItem('token');
    const reqData = {
        method: 'patch',
        url: `todo/${id}`,
        headers: {
            Authorization: token,
        },
        data,
    };
    try {
        const response = await axios(reqData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
const deleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    const reqData = {
        method: 'delete',
        url: `todo/${id}`,
        headers: {
            Authorization: token,
        },
    };
    try {
        const response = await axios(reqData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export { getAllTodos, addTodo, editTodo, deleteTodo };
