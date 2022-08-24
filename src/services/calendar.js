import axios from 'axios';

const getAllEvents = async () => {
    const reqData = {
        method: 'get',
        url: `events`,
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

export { getAllEvents };
