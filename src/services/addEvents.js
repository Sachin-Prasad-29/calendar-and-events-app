import axios from 'axios';

const addEvent = async (eventDetails) => {
    
    const reqData = {
        method: 'post',
        url: `events`,
        headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        data:eventDetails
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

export { addEvent };
