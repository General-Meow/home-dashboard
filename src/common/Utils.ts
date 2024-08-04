class Utils {

    getDateName = function(date) {
        return date.toLocaleDateString('en-GB', { weekday: 'long' });
    }
}

const utils = new Utils();

export default utils;
