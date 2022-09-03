import axios from 'axios';

//service method to get all the event for the logged in user
const getAllEvents = async () => {
    const token = localStorage.getItem('token');
    const reqData = {
        method: 'get',
        url: `events`,
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

// service method  which give max 10 events for pagination and support filteration
const getEvents = async (params, token) => {
    const reqData = {
        method: 'get',
        url: `events/filter?${params}`,
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

// service method to add a event
const addEvent = async (eventDetails, token) => {
    const reqData = {
        method: 'post',
        url: `events`,
        headers: {
            Authorization: token,
        },
        data: eventDetails,
    };
    try {
        const response = await axios(reqData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

//servie method to edit the event
const editEvent = async (eventId, eventDetails, token) => {
    const reqData = {
        method: 'patch',
        url: `events/${eventId}`,
        headers: {
            Authorization: token,
        },
        data: eventDetails,
    };
    try {
        const response = await axios(reqData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

//service method to excuse the event
const excuseEvent = async (eventId, eventDetails, token) => {
    const reqData = {
        method: 'patch',
        url: `events/${eventId}/excuse`,
        headers: {
            Authorization: token,
        },
        data: eventDetails,
    };
    try {
        const response = await axios(reqData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

//service method to delete a event
const deleteEvent = async (eventId, token) => {
    const reqData = {
        method: 'delete',
        url: `events/${eventId}`,
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

export { getAllEvents, getEvents, addEvent, editEvent, excuseEvent, deleteEvent };
