import axios from 'axios';

//service method to register this method will generate the otp
const register = async (userDetails) => {
    const reqData = {
        method: 'post',
        url: `auth/register`,
        data: userDetails,
    };
    try {
        const response = await axios(reqData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

//service to login the user and get token for validation
const login = async (userDetails) => {
    const reqData = {
        method: 'post',
        url: `auth/login`,
        data: userDetails,
    };
    try {
        const response = await axios(reqData);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

//service method which will check otp entered by user duing the registration process
const validate = async (userDetails) => {
    const reqData = {
        method: 'post',
        url: `auth/register/verify`,
        data: userDetails,
    };
    try {
        const response = await axios(reqData);
        return response.data;
    } catch (error) {
        return error.response;
    }
    
};

export { login, register, validate };
