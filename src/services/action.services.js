import axios from 'axios';

// services to fetch logged in user details 
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
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

//services to get all the user details
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
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export { getAllUsers, getUserDetails };
