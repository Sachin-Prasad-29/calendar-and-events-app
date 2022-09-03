// filter to get time format in 12: 00 PM format
const getTime = (timeObj) => {
    if (!timeObj) return '';
    let hours;
    let minutes;

    hours = timeObj.hours % 12;
    if (hours === 0) hours = 12;
    if (hours < 10) hours = `0${hours}`;

    minutes = timeObj.minutes;
    if (minutes < 10) minutes = `0${minutes}`;

    let convension;
    if (timeObj.hours >= 12) convension = 'PM';
    else convension = 'AM';

    return `${hours} : ${minutes} ${convension}`;
};

export { getTime };
