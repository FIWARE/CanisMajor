import { iota_configuration } from '../config/config.json';

class IOTATransactionController {
    // web3 instance
    constructor() {
        console.log(iota_configuration);
    }

    processTransaction(context, authToken) {
        console.log('context');
        console.log(context);
        console.log('auth');
        console.log(authToken);
    }
}

export default new IOTATransactionController();
