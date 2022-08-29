import axios from 'axios';

const getUserDetails = async () => {
    const reqData = {
        method: 'get',
        url: `auth/profile`,
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    };
    try {
        const response = await axios(reqData);
        //console.log(response.data);
        return response.data;
    } catch (error) {
        // console.log(error.response.data);
        return error.response.data;
    }
};

const getAllUsers = async () => {
    const reqData = {
        method: 'get',
        url: `auth/users`,
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    };
    try {
        const response = await axios(reqData);
        //console.log(response.data);
        return response.data;
    } catch (error) {
        // console.log(error.response.data);
        return error.response.data;
    }
};

export { getAllUsers, getUserDetails };
