export const SERVER_PATH = getServerPath();

export const CLIENT_PATH = getClientPath();

//export const LOCAL_PATH = document.location.origin;

function getClientPath() {

    if (process.env.NODE_ENV === 'production') {
        return document.location.origin;
    } else {
        return 'http://localhost:3000';
    }

}

function getServerPath() {
    if (process.env.NODE_ENV === 'production') {
        return document.location.origin;
    } else {
        return 'http://localhost:5000';
    }
}