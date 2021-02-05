import Web3 from 'web3';
import { CONSTANTS } from '../configuration/config';
import Tx from 'ethereumjs-tx';

class EthereumService {

    // web3 instance
    constructor(configuration) {
        this.abi = configuration.metadata.abi;
        this.endpoint = CONSTANTS.DLT_CONFIG.endpoint;
        this.default_gas = CONSTANTS.DLT_CONFIG.default_gas;
        this.default_gasPrice = CONSTANTS.DLT_CONFIG.default_gasPrice;
        this.contract_address = configuration.metadata.contractAddress;
        this.web3 = new Web3();
        this.contract_schema = this.abi;
        this.web3.setProvider(`${this.endpoint}`);
        try {
            if (!this.contract_schema) {
                throw new Error(`The provided contract JSON is missing the 'abi'.  
                Are you sure you're using the build artifact produced by truffle compile?`);
            }
            this.contract = new this.web3.eth.Contract(this.contract_schema, this.contract_address);
        } catch (err) {
            this.contract = null;
            throw new Error(err);
        }
    }

    /**
     * @function
     * @private
     * @param {Hex} from - eth address of user executing this function
     * */
    createCall(from) {
        "use strict";
        let sender = {
            from: from
        };
        if (this.default_gas) {
            sender.gas = this.default_gas
        }
        if (this.default_gasPrice) {
            sender.gasPrice = this.default_gasPrice
        }
        return sender;
    }

    // /**
    //  * @function
    //  * @param {String} method_name - name of the method to be called
    //  * @param {Hex} from - from address
    //  * @param {Array} params - params needed to call the contract... in same order as defined!!!
    //  * @description
    //  * calls the smart contract's method, and on successful transaction, will call the callback with a receipt
    //  * @returns {Promise}
    //  * */
    write(method_name, from, params) {
        "use strict";
        return this.contract.methods[method_name.toLowerCase()]
            .apply(this, params)
            .send(this.createCall(from));
    }

    // pending
    rawTransaction() {

    }

    // pending
    sendSignedTransaction() {

    }

    // /**
    //  * @function
    //  * @param {String} method_name - name of the method to be called
    //  * @param {Hex} from - from address
    //  * @param {Array} read_params - params needed to call the contract... in same order as defined!!!
    //  * @param {Function} callback
    //  * @description
    //  * calls the smart contract's method, and on successful transaction, will call the callback with a receipt
    //  * @returns {Promise}
    //  * */
    read(method_name, from, read_params){
        return this.contract.methods[method_name]
            .apply(this, read_params)
            .call(this.createCall(from));
    }
    // /**
    //  * @function 
    //  * @description
    //  * */
    async processTransaction(data, address, privateKey) {
        let response = [];
        // transaction as per config
        await Promise.all(data.map(async (element) => {
            let tx = await this.write(element.method, address, element.value);
            response.push(tx);
        }));
        return response;
    }
}

export default EthereumService;
