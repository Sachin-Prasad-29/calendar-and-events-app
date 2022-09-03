import axios from 'axios';

//service method to edit the profile of the user
const editUserProfile = async (profileDetails, token) => {
    const reqData = {
        method: 'patch',
        url: `auth/profile`,
        headers: {
            Authorization: token,
        },
        data: profileDetails,
    };
    try {
        const response = await axios(reqData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

//service method to upload and change the profile of the user
const uploadProfile = async (data, token) => {
    let formData = new FormData();
    formData.append('photo', data);
    const reqData = {
        method: 'patch',
        url: `auth/profilepic`,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
        },
        data: formData,
    };
    try {
        const response = await axios(reqData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export { editUserProfile, uploadProfile };
