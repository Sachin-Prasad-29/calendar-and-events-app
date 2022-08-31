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

const getEvents = async (params) => {
    const reqData = {
        method: 'get',
        url: `events/filter?${params}`,
        headers: {
            Authorization: localStorage.getItem('token'),
        },
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
const addEvent = async (eventDetails) => {
    const reqData = {
        method: 'post',
        url: `events`,
        headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        data: eventDetails,
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

const editEvent = async (eventId, eventDetails) => {
    const reqData = {
        method: 'patch',
        url: `events/${eventId}`,
        headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        data: eventDetails,
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

const excuseEvent = async (eventId, eventDetails ) => {
    const reqData = {
        method: 'patch',
        url: `events/${eventId}/excuse`,
        headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        data: eventDetails,
    };
    console.log(reqData);
    try {
        const response = await axios(reqData);
        //console.log(response.data);
        return response.data;
    } catch (error) {
        //console.log(error.response.data);
        return error.response.data;
    }
};

const deleteEvent = async (eventId) => {
    const reqData = {
        method: 'delete',
        url: `events/${eventId}`,
        headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
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

export { getAllEvents, getEvents, addEvent, editEvent, excuseEvent, deleteEvent };
