import EthTransactionProcessor from '../processor/eth-transation-processor';

class EthTransactionHandlerController {

    async createATrasaction(request, response, next) {
        // for the tx pass
        request.query.debug = true;
        console.log('dsadas');
        Promise.all([new EthTransactionProcessor
            .transactionResolve(request, response, next)]);
    }

    async readTransactionData() {

    }

    async retryTransaction() {

    }
}

export default new EthTransactionHandlerController();
