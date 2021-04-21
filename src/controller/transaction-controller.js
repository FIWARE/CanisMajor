import ethTransactionController from './eth-transaction-controller';
import aeiContractController from './aei-contract-controller';
import iotaTransactionController from './iota-transaction-controller';
import { DLT_TYPE, DLTType, DLT_CONFIGURATION } from '../configuration/config';

class TransactionController {
    async createATransaction(request, response, next) {
        if (DLT_TYPE == DLTType.IOTA) {
            iotaTransactionController.createATrasaction(request, response, next);
        } else if (DLT_TYPE == DLTType.ETHEREUM) {
            (DLT_CONFIGURATION.ETHEREUM_CONFIG.aei_contract_mode)
                ? aeiContractController.CreateAsset(request, response, next)
                : ethTransactionController.createATrasaction(request, response, next)
        }
    }
}

export default new TransactionController();
