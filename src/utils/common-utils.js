import { version, name } from '../../package.json';

/**
 * Returns version information about this concrete instance of the STH component
 * @return {object} A JSON-formatted object including the version information
 */
const getVersion = () => {
    const message = {};
    if (version) {
            message.version = version;
    }
    if (Object.getOwnPropertyNames(message).length === 0) {
        message.version = 'No version information available';
    }
    return message;
}

const getName = () => {
    const message = {};
    if (name) {
            message.name = name;
    }
    if (Object.getOwnPropertyNames(name).length === 0) {
        message.name = 'No name information available';
    }
    return message;
}

export {
    getVersion,
    getName,
}