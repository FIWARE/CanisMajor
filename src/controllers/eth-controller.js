import Web3 from 'web3';
import { decrypt } from '../helpers/crypto-resolve-helpers';
import { eth_configuration } from '../config/config.json';
const contract_schema = require('../config/SimpleStorage.json');

class EthTransactionController {
    // web3 instance
    constructor() {
        this.web3 = new Web3();
        this.web3.setProvider(`${eth_configuration.provider}`);
        try {
            if (!contract_schema.abi || 
                !contract_schema.contractName ||
                !contract_schema.networks){
                throw new Error(`The provided contract JSON is missing the 'abi', 
                'contractName', 'networks' keys.  
                Are you sure you're using the build artifact produced by truffle compile?`);
            }
        this.contract = new this.web3.eth.Contract(contract_schema.abi, eth_configuration.contract_address);
        } catch (err) {
            this.contract =null;
            console.log(err);
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
        if (eth_configuration.default_gas) {
            sender.gas = eth_configuration.default_gas
        }
        if (eth_configuration.default_gasPrice) {
            sender.gasPrice = eth_configuration.default_gasPrice
        }
        return sender;
    }
    /**
     * @function
     * @param {String} method_name - name of the method to be called
     * @param {Hex} from - from address
     * @param {Array} params - params needed to call the contract... in same order as defined!!!
     * @description
     * calls the smart contract's method, and on successful transaction, will call the callback with a receipt
     * @returns {Promise}
     * */
    write(method_name, from, params) {
        "use strict";
        return this.contract.methods[method_name.toLowerCase()]
            .apply(this, params)
            .send(this.createCall(from))
    }
    /**
     * @function
     * @param {String} method_name - name of the method to be called
     * @param {Hex} from - from address
     * @param {Array} read_params - params needed to call the contract... in same order as defined!!!
     * @param {Function} callback
     * @description
     * calls the smart contract's method, and on successful transaction, will call the callback with a receipt
     * @returns {Promise}
     * */
    read(method_name, from, read_params, callback = () => { }) {
        return this.contract.methods[method_name]
            .apply(this, read_params)
            .call({ from }, (err, result) => {
                if (err) {
                    console.log(`failed to execute ${method_name}... ${err}`);
                    throw new Error(`failed to execute ${method_name}... ${err}`);
                } else {
                    callback(result);
                }
            });
    }


    parameterResolver(context) {
        if (context.type === eth_configuration.contextMapping.type) {
            const obj = [];
            eth_configuration.contextMapping.parameters.forEach((items) => {
                console.log(items);
                if(context.hasOwnProperty(items)) {
                    obj.push(context[items].value);  
                }  
            });
            return obj;
        } else {
            // context type is not valid
            return null;
        }
    }

    addressResolver(authToken) {
        return JSON.parse(decrypt(authToken)).publicAddress;
    }

    processTransaction(context, authToken) {
        // contract parameter resolution
        let contractParameters = this.parameterResolver(context);
        
        if(contractParameters === null || contractParameters === '') {
            var err = new Error();
            err.status = 403;
            err.message = 'context parameters not mapped';
            return err;
        }

        //address resolver
        let submitterAddress = this.addressResolver(authToken);
        if(submitterAddress === null || submitterAddress === '') {
            var err = new Error();
            err.status = 403;
            err.message = 'address in not defined or missing';
            return err;
        }
        
        return this.write(eth_configuration.contextMapping.method, submitterAddress, contractParameters);
    }
}

export default new EthTransactionController();
