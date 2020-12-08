import Web3 from 'web3';

class EthTransactionController {
    // web3 instance
    constructor(configuration) {
        this.abi = configuration.abi;
        this.endpoint = configuration.endpoint;
        this.default_gas = configuration.default_gas;
        this.default_gasPrice = configuration.default_gasPrice;
        this.contract_address = configuration.contract_address;
        this.web3 = new Web3();
        this.contract_schema = this.abi;
        this.web3.setProvider(`${this.endpoint}`);
        console.log(configuration.abi);
        try {
            if (!this.contract_schema.abi || 
                !this.contract_schema.contractName ||
                !this.contract_schema.networks){
                throw new Error(`The provided contract JSON is missing the 'abi', 
                'contractName', 'networks' keys.  
                Are you sure you're using the build artifact produced by truffle compile?`);
            }
        this.contract = new this.web3.eth.Contract(this.contract_schema.abi, this.contract_address);
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
        if (this.default_gas) {
            sender.gas = this.default_gas
        }
        if (this.default_gasPrice) {
            sender.gasPrice = this.default_gasPrice
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
    read(method_name, from, read_params) {
        // return this.contract.methods[method_name]
        //     .apply(this, read_params)
        //     .call({ from }, (err, result) => {
        //         if (err) {
        //             console.log(`failed to execute ${method_name}... ${err}`);
        //             throw new Error(`failed to execute ${method_name}... ${err}`);
        //         } else {
        //             console.log(`result ${result}`);
        //         }
        //     });
    }


  async  processTransaction(data, auth) {
        let response = [];
        // contract parameter resolution
        if(data === null || data === '') {
            let err = new Error();
            err.status = 403;
            err.message = 'context parameters not mapped';
            return err;
        }

        //address resolver
        let submitterAddress = auth;
        if(submitterAddress === null || submitterAddress === '') {
            let err = new Error();
            err.status = 403;
            err.message = 'address in not defined or missing';
            return err;
        }
        // multiple transaction queue
        data.forEach((elements) => {
            let tx = this.write(elements.method, submitterAddress, elements.value);
            response.push(tx);
        });
        // return this.write(data[0].method, submitterAddress, data[0].value);
        
    }
}

export default EthTransactionController;
