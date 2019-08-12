import moment = require('moment');

const getAge = (dob: Date) => {
    return parseInt(moment(dob, 'YYYY-MM-DD h:mm:ss').fromNow(), 10);
};

const capitalize = (s: string): string => {
    if (typeof s !== 'string') { return ''; }
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export { getAge, capitalize };