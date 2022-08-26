import axios from 'axios';

const editUserProfile = async (profileDetails) => {
    const reqData = {
        method: 'patch',
        url: `auth/profile`,
        headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        data:profileDetails
    };
    try {
        const response = await axios(reqData);
        //console.log(response.data);
        return response.data;
    } catch (error) {
        //console.log(error.response.data);
        return error.response.data;
    }
};

export { editUserProfile };
