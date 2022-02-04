package org.fiware.aeicontract;

import io.reactivex.Flowable;
import io.reactivex.functions.Function;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 1.4.1.
 */
@SuppressWarnings("rawtypes")
public class ERC721Full extends Contract {
    public static final String BINARY = "0x60806040523480156200001157600080fd5b5060405162001aa438038062001aa4833981810160405260408110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b5060405250839150829050620001be6301ffc9a760e01b6001600160e01b036200024516565b620001d96380ac58cd60e01b6001600160e01b036200024516565b620001f463780e9d6360e01b6001600160e01b036200024516565b815162000209906009906020850190620002ca565b5080516200021f90600a906020840190620002ca565b506200023b635b5e139f60e01b6001600160e01b036200024516565b505050506200036f565b6001600160e01b03198082161415620002a5576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152602081905260409020805460ff19166001179055565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200030d57805160ff19168380011785556200033d565b828001600101855582156200033d579182015b828111156200033d57825182559160200191906001019062000320565b506200034b9291506200034f565b5090565b6200036c91905b808211156200034b576000815560010162000356565b90565b611725806200037f6000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80634f6ccce7116100a257806395d89b411161007157806395d89b4114610349578063a22cb46514610351578063b88d4fde1461037f578063c87b56dd14610445578063e985e9c5146104625761010b565b80634f6ccce7146102e15780636352211e146102fe5780636c0360eb1461031b57806370a08231146103235761010b565b806318160ddd116100de57806318160ddd1461022f57806323b872dd146102495780632f745c591461027f57806342842e0e146102ab5761010b565b806301ffc9a71461011057806306fdde031461014b578063081812fc146101c8578063095ea7b314610201575b600080fd5b6101376004803603602081101561012657600080fd5b50356001600160e01b031916610490565b604080519115158252519081900360200190f35b6101536104b3565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561018d578181015183820152602001610175565b50505050905090810190601f1680156101ba5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101e5600480360360208110156101de57600080fd5b503561054a565b604080516001600160a01b039092168252519081900360200190f35b61022d6004803603604081101561021757600080fd5b506001600160a01b0381351690602001356105ac565b005b6102376106d4565b60408051918252519081900360200190f35b61022d6004803603606081101561025f57600080fd5b506001600160a01b038135811691602081013590911690604001356106da565b6102376004803603604081101561029557600080fd5b506001600160a01b038135169060200135610736565b61022d600480360360608110156102c157600080fd5b506001600160a01b038135811691602081013590911690604001356107b5565b610237600480360360208110156102f757600080fd5b50356107d0565b6101e56004803603602081101561031457600080fd5b5035610836565b610153610890565b6102376004803603602081101561033957600080fd5b50356001600160a01b03166108f1565b610153610959565b61022d6004803603604081101561036757600080fd5b506001600160a01b03813516906020013515156109ba565b61022d6004803603608081101561039557600080fd5b6001600160a01b038235811692602081013590911691604082013591908101906080810160608201356401000000008111156103d057600080fd5b8201836020820111156103e257600080fd5b8035906020019184600183028401116401000000008311171561040457600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610abf945050505050565b6101536004803603602081101561045b57600080fd5b5035610b1d565b6101376004803603604081101561047857600080fd5b506001600160a01b0381358116916020013516610ce9565b6001600160e01b0319811660009081526020819052604090205460ff165b919050565b60098054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561053f5780601f106105145761010080835404028352916020019161053f565b820191906000526020600020905b81548152906001019060200180831161052257829003601f168201915b505050505090505b90565b600061055582610d17565b6105905760405162461bcd60e51b815260040180806020018281038252602c8152602001806115ef602c913960400191505060405180910390fd5b506000908152600260205260409020546001600160a01b031690565b60006105b782610836565b9050806001600160a01b0316836001600160a01b0316141561060a5760405162461bcd60e51b81526004018080602001828103825260218152602001806116736021913960400191505060405180910390fd5b806001600160a01b031661061c610d34565b6001600160a01b0316148061063d575061063d81610638610d34565b610ce9565b6106785760405162461bcd60e51b81526004018080602001828103825260388152602001806115646038913960400191505060405180910390fd5b60008281526002602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b60075490565b6106eb6106e5610d34565b82610d38565b6107265760405162461bcd60e51b81526004018080602001828103825260318152602001806116946031913960400191505060405180910390fd5b610731838383610ddc565b505050565b6000610741836108f1565b821061077e5760405162461bcd60e51b815260040180806020018281038252602b8152602001806114b7602b913960400191505060405180910390fd5b6001600160a01b03831660009081526005602052604090208054839081106107a257fe5b9060005260206000200154905092915050565b61073183838360405180602001604052806000815250610abf565b60006107da6106d4565b82106108175760405162461bcd60e51b815260040180806020018281038252602c8152602001806116c5602c913960400191505060405180910390fd5b6007828154811061082457fe5b90600052602060002001549050919050565b6000818152600160205260408120546001600160a01b03168061088a5760405162461bcd60e51b81526004018080602001828103825260298152602001806115c66029913960400191505060405180910390fd5b92915050565b600b8054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561053f5780601f106105145761010080835404028352916020019161053f565b60006001600160a01b0382166109385760405162461bcd60e51b815260040180806020018281038252602a81526020018061159c602a913960400191505060405180910390fd5b6001600160a01b038216600090815260036020526040902061088a90610dfb565b600a8054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561053f5780601f106105145761010080835404028352916020019161053f565b6109c2610d34565b6001600160a01b0316826001600160a01b03161415610a28576040805162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b8060046000610a35610d34565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff191692151592909217909155610a79610d34565b60408051841515815290516001600160a01b0392909216917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319181900360200190a35050565b610ad0610aca610d34565b83610d38565b610b0b5760405162461bcd60e51b81526004018080602001828103825260318152602001806116946031913960400191505060405180910390fd5b610b1784848484610dff565b50505050565b6060610b2882610d17565b610b635760405162461bcd60e51b815260040180806020018281038252602f815260200180611644602f913960400191505060405180910390fd5b6000828152600c602090815260409182902080548351601f6002600019610100600186161502019093169290920491820184900484028101840190945280845260609392830182828015610bf85780601f10610bcd57610100808354040283529160200191610bf8565b820191906000526020600020905b815481529060010190602001808311610bdb57829003601f168201915b50505050509050805160001415610c1f5750506040805160208101909152600081526104ae565b600b816040516020018083805460018160011615610100020316600290048015610c805780601f10610c5e576101008083540402835291820191610c80565b820191906000526020600020905b815481529060010190602001808311610c6c575b5050825160208401908083835b60208310610cac5780518252601f199092019160209182019101610c8d565b6001836020036101000a038019825116818451168082178552505050505050905001925050506040516020818303038152906040529150506104ae565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205460ff1690565b6000908152600160205260409020546001600160a01b0316151590565b3390565b6000610d4382610d17565b610d7e5760405162461bcd60e51b815260040180806020018281038252602c815260200180611538602c913960400191505060405180910390fd5b6000610d8983610836565b9050806001600160a01b0316846001600160a01b03161480610dc45750836001600160a01b0316610db98461054a565b6001600160a01b0316145b80610dd45750610dd48185610ce9565b949350505050565b610de7838383610e51565b610df18382610f95565b610731828261108a565b5490565b610e0a848484610ddc565b610e16848484846110c8565b610b175760405162461bcd60e51b81526004018080602001828103825260328152602001806114e26032913960400191505060405180910390fd5b826001600160a01b0316610e6482610836565b6001600160a01b031614610ea95760405162461bcd60e51b815260040180806020018281038252602981526020018061161b6029913960400191505060405180910390fd5b6001600160a01b038216610eee5760405162461bcd60e51b81526004018080602001828103825260248152602001806115146024913960400191505060405180910390fd5b610ef781611303565b6001600160a01b0383166000908152600360205260409020610f1890611340565b6001600160a01b0382166000908152600360205260409020610f3990611357565b60008181526001602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b038216600090815260056020526040812054610fbf90600163ffffffff61136016565b60008381526006602052604090205490915080821461105a576001600160a01b0384166000908152600560205260408120805484908110610ffc57fe5b906000526020600020015490508060056000876001600160a01b03166001600160a01b03168152602001908152602001600020838154811061103a57fe5b600091825260208083209091019290925591825260069052604090208190555b6001600160a01b0384166000908152600560205260409020805490611083906000198301611479565b5050505050565b6001600160a01b0390911660009081526005602081815260408084208054868652600684529185208290559282526001810183559183529091200155565b60006110dc846001600160a01b03166113a9565b6110e857506001610dd4565b600060606001600160a01b038616630a85bd0160e11b611106610d34565b89888860405160240180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561117f578181015183820152602001611167565b50505050905090810190601f1680156111ac5780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909a16999099178952518151919890975087965094509250829150849050835b602083106112145780518252601f1990920191602091820191016111f5565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611276576040519150601f19603f3d011682016040523d82523d6000602084013e61127b565b606091505b5091509150816112cc578051156112955780518082602001fd5b60405162461bcd60e51b81526004018080602001828103825260328152602001806114e26032913960400191505060405180910390fd5b60008180602001905160208110156112e357600080fd5b50516001600160e01b031916630a85bd0160e11b149350610dd492505050565b6000818152600260205260409020546001600160a01b03161561133d57600081815260026020526040902080546001600160a01b03191690555b50565b805461135390600163ffffffff61136016565b9055565b80546001019055565b60006113a283836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506113e2565b9392505050565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470818114801590610dd4575050151592915050565b600081848411156114715760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561143657818101518382015260200161141e565b50505050905090810190601f1680156114635780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b8154818355818111156107315760008381526020902061073191810190830161054791905b808211156114b2576000815560010161149e565b509056fe455243373231456e756d657261626c653a206f776e657220696e646578206f7574206f6620626f756e64734552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732314d657461646174613a2055524920717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243373231456e756d657261626c653a20676c6f62616c20696e646578206f7574206f6620626f756e6473a265627a7a723158202b51dcc85aa86c2e66b960686e25a4e7dfa022ff074b46711ea794621494e1b664736f6c63430005100032";

    public static final String FUNC_APPROVE = "approve";

    public static final String FUNC_BALANCEOF = "balanceOf";

    public static final String FUNC_BASEURI = "baseURI";

    public static final String FUNC_GETAPPROVED = "getApproved";

    public static final String FUNC_ISAPPROVEDFORALL = "isApprovedForAll";

    public static final String FUNC_NAME = "name";

    public static final String FUNC_OWNEROF = "ownerOf";

    public static final String FUNC_safeTransferFrom = "safeTransferFrom";

    public static final String FUNC_SETAPPROVALFORALL = "setApprovalForAll";

    public static final String FUNC_SUPPORTSINTERFACE = "supportsInterface";

    public static final String FUNC_SYMBOL = "symbol";

    public static final String FUNC_TOKENBYINDEX = "tokenByIndex";

    public static final String FUNC_TOKENOFOWNERBYINDEX = "tokenOfOwnerByIndex";

    public static final String FUNC_TOKENURI = "tokenURI";

    public static final String FUNC_TOTALSUPPLY = "totalSupply";

    public static final String FUNC_TRANSFERFROM = "transferFrom";

    public static final Event APPROVAL_EVENT = new Event("Approval", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>(true) {}));
    ;

    public static final Event APPROVALFORALL_EVENT = new Event("ApprovalForAll", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Bool>() {}));
    ;

    public static final Event TRANSFER_EVENT = new Event("Transfer", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>(true) {}));
    ;

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
    }

    @Deprecated
    protected ERC721Full(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected ERC721Full(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected ERC721Full(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected ERC721Full(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public List<ApprovalEventResponse> getApprovalEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(APPROVAL_EVENT, transactionReceipt);
        ArrayList<ApprovalEventResponse> responses = new ArrayList<ApprovalEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            ApprovalEventResponse typedResponse = new ApprovalEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.approved = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.tokenId = (BigInteger) eventValues.getIndexedValues().get(2).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<ApprovalEventResponse> approvalEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, ApprovalEventResponse>() {
            @Override
            public ApprovalEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(APPROVAL_EVENT, log);
                ApprovalEventResponse typedResponse = new ApprovalEventResponse();
                typedResponse.log = log;
                typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.approved = (String) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.tokenId = (BigInteger) eventValues.getIndexedValues().get(2).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<ApprovalEventResponse> approvalEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(APPROVAL_EVENT));
        return approvalEventFlowable(filter);
    }

    public List<ApprovalForAllEventResponse> getApprovalForAllEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(APPROVALFORALL_EVENT, transactionReceipt);
        ArrayList<ApprovalForAllEventResponse> responses = new ArrayList<ApprovalForAllEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            ApprovalForAllEventResponse typedResponse = new ApprovalForAllEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.operator = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.approved = (Boolean) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<ApprovalForAllEventResponse> approvalForAllEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, ApprovalForAllEventResponse>() {
            @Override
            public ApprovalForAllEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(APPROVALFORALL_EVENT, log);
                ApprovalForAllEventResponse typedResponse = new ApprovalForAllEventResponse();
                typedResponse.log = log;
                typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.operator = (String) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.approved = (Boolean) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<ApprovalForAllEventResponse> approvalForAllEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(APPROVALFORALL_EVENT));
        return approvalForAllEventFlowable(filter);
    }

    public List<TransferEventResponse> getTransferEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(TRANSFER_EVENT, transactionReceipt);
        ArrayList<TransferEventResponse> responses = new ArrayList<TransferEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            TransferEventResponse typedResponse = new TransferEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.from = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.to = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.tokenId = (BigInteger) eventValues.getIndexedValues().get(2).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<TransferEventResponse> transferEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, TransferEventResponse>() {
            @Override
            public TransferEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(TRANSFER_EVENT, log);
                TransferEventResponse typedResponse = new TransferEventResponse();
                typedResponse.log = log;
                typedResponse.from = (String) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.to = (String) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.tokenId = (BigInteger) eventValues.getIndexedValues().get(2).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<TransferEventResponse> transferEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(TRANSFER_EVENT));
        return transferEventFlowable(filter);
    }

    public RemoteFunctionCall<TransactionReceipt> approve(String to, BigInteger tokenId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_APPROVE, 
                Arrays.<Type>asList(new Address(to),
                new Uint256(tokenId)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> balanceOf(String owner) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_BALANCEOF, 
                Arrays.<Type>asList(new Address(owner)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> baseURI() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_BASEURI, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> getApproved(BigInteger tokenId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_GETAPPROVED, 
                Arrays.<Type>asList(new Uint256(tokenId)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<Boolean> isApprovedForAll(String owner, String operator) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ISAPPROVEDFORALL, 
                Arrays.<Type>asList(new Address(owner),
                new Address(operator)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<String> name() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_NAME, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> ownerOf(BigInteger tokenId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_OWNEROF, 
                Arrays.<Type>asList(new Uint256(tokenId)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> safeTransferFrom(String from, String to, BigInteger tokenId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_safeTransferFrom, 
                Arrays.<Type>asList(new Address(from),
                new Address(to),
                new Uint256(tokenId)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> safeTransferFrom(String from, String to, BigInteger tokenId, byte[] _data) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_safeTransferFrom, 
                Arrays.<Type>asList(new Address(from),
                new Address(to),
                new Uint256(tokenId),
                new org.web3j.abi.datatypes.DynamicBytes(_data)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> setApprovalForAll(String to, Boolean approved) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SETAPPROVALFORALL, 
                Arrays.<Type>asList(new Address(to),
                new Bool(approved)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Boolean> supportsInterface(byte[] interfaceId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_SUPPORTSINTERFACE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes4(interfaceId)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<String> symbol() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_SYMBOL, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> tokenByIndex(BigInteger index) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_TOKENBYINDEX, 
                Arrays.<Type>asList(new Uint256(index)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> tokenOfOwnerByIndex(String owner, BigInteger index) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_TOKENOFOWNERBYINDEX, 
                Arrays.<Type>asList(new Address(owner),
                new Uint256(index)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> tokenURI(BigInteger tokenId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_TOKENURI, 
                Arrays.<Type>asList(new Uint256(tokenId)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> totalSupply() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_TOTALSUPPLY, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> transferFrom(String from, String to, BigInteger tokenId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_TRANSFERFROM, 
                Arrays.<Type>asList(new Address(from),
                new Address(to),
                new Uint256(tokenId)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static ERC721Full load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new ERC721Full(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static ERC721Full load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new ERC721Full(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static ERC721Full load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new ERC721Full(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static ERC721Full load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new ERC721Full(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<ERC721Full> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider, String name, String symbol) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new Utf8String(name),
                new Utf8String(symbol)));
        return deployRemoteCall(ERC721Full.class, web3j, credentials, contractGasProvider, BINARY, encodedConstructor);
    }

    public static RemoteCall<ERC721Full> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider, String name, String symbol) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new Utf8String(name),
                new Utf8String(symbol)));
        return deployRemoteCall(ERC721Full.class, web3j, transactionManager, contractGasProvider, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<ERC721Full> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit, String name, String symbol) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new Utf8String(name),
                new Utf8String(symbol)));
        return deployRemoteCall(ERC721Full.class, web3j, credentials, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<ERC721Full> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit, String name, String symbol) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new Utf8String(name),
                new Utf8String(symbol)));
        return deployRemoteCall(ERC721Full.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    protected String getStaticDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static String getPreviouslyDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static class ApprovalEventResponse extends BaseEventResponse {
        public String owner;

        public String approved;

        public BigInteger tokenId;
    }

    public static class ApprovalForAllEventResponse extends BaseEventResponse {
        public String owner;

        public String operator;

        public Boolean approved;
    }

    public static class TransferEventResponse extends BaseEventResponse {
        public String from;

        public String to;

        public BigInteger tokenId;
    }
}
