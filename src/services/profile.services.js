import axios from 'axios'

const editUserProfile = async (profileDetails) => {
    const reqData = {
        method: 'patch',
        url: 'auth/profile',
        headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        data: profileDetails,
    }
    try {
        const response = await axios(reqData)
        // console.log(response.data);
        return response.data
    } catch (error) {
        // console.log(error.response.data);
        return error.response.data
    }
}

const uploadProfile = async (data) => {
    const formData = new FormData()
    formData.append('photo', data)
    const reqData = {
        method: 'patch',
        url: 'auth/profilepic',
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token'),
        },
        data: formData,
    }
    try {
        const response = await axios(reqData)
        return response.data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }
}

const removeProfile = async () => {
    const reqData = {
        method: 'delete',
        url: 'auth/profilepic',
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token'),
        },
    }
    try {
        const response = await axios(reqData)
        return response.data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }
}

export { editUserProfile, uploadProfile, removeProfile }
