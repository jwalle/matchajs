import moment = require('moment');

const getAge = (dob: Date) => {
    return parseInt(moment(dob, 'YYYY-MM-DD h:mm:ss').fromNow(), 10);
};

export { getAge };