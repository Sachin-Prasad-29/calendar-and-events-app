import axios from 'axios';

// services to fetch logged in user details 
const getUserDetails = async (token) => {
    const reqData = {
        method: 'get',
        url: `auth/profile`,
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

//services to get all the user details
const getAllUsers = async (token) => {
    const reqData = {
        method: 'get',
        url: `auth/users`,
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

export { getAllUsers, getUserDetails };
