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
public class ERC721Metadata extends Contract {
    public static final String BINARY = "0x60806040523480156200001157600080fd5b506040516200174138038062001741833981810160405260408110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b5060405250620001bc91506301ffc9a760e01b90506001600160e01b036200022616565b620001d76380ac58cd60e01b6001600160e01b036200022616565b8151620001ec906005906020850190620002ab565b50805162000202906006906020840190620002ab565b506200021e635b5e139f60e01b6001600160e01b036200022616565b505062000350565b6001600160e01b0319808216141562000286576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152602081905260409020805460ff19166001179055565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620002ee57805160ff19168380011785556200031e565b828001600101855582156200031e579182015b828111156200031e57825182559160200191906001019062000301565b506200032c92915062000330565b5090565b6200034d91905b808211156200032c576000815560010162000337565b90565b6113e180620003606000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80636c0360eb1161008c578063a22cb46511610066578063a22cb465146102df578063b88d4fde1461030d578063c87b56dd146103d3578063e985e9c5146103f0576100ea565b80636c0360eb1461029757806370a082311461029f57806395d89b41146102d7576100ea565b8063095ea7b3116100c8578063095ea7b3146101e057806323b872dd1461020e57806342842e0e146102445780636352211e1461027a576100ea565b806301ffc9a7146100ef57806306fdde031461012a578063081812fc146101a7575b600080fd5b6101166004803603602081101561010557600080fd5b50356001600160e01b03191661041e565b604080519115158252519081900360200190f35b610132610441565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561016c578181015183820152602001610154565b50505050905090810190601f1680156101995780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101c4600480360360208110156101bd57600080fd5b50356104d7565b604080516001600160a01b039092168252519081900360200190f35b61020c600480360360408110156101f657600080fd5b506001600160a01b038135169060200135610539565b005b61020c6004803603606081101561022457600080fd5b506001600160a01b03813581169160208101359091169060400135610661565b61020c6004803603606081101561025a57600080fd5b506001600160a01b038135811691602081013590911690604001356106bd565b6101c46004803603602081101561029057600080fd5b50356106d8565b610132610732565b6102c5600480360360208110156102b557600080fd5b50356001600160a01b0316610793565b60408051918252519081900360200190f35b6101326107fb565b61020c600480360360408110156102f557600080fd5b506001600160a01b038135169060200135151561085c565b61020c6004803603608081101561032357600080fd5b6001600160a01b0382358116926020810135909116916040820135919081019060808101606082013564010000000081111561035e57600080fd5b82018360208201111561037057600080fd5b8035906020019184600183028401116401000000008311171561039257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610961945050505050565b610132600480360360208110156103e957600080fd5b50356109bf565b6101166004803603604081101561040657600080fd5b506001600160a01b0381358116916020013516610b8b565b6001600160e01b0319811660009081526020819052604090205460ff165b919050565b60058054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104cd5780601f106104a2576101008083540402835291602001916104cd565b820191906000526020600020905b8154815290600101906020018083116104b057829003601f168201915b5050505050905090565b60006104e282610bb9565b61051d5760405162461bcd60e51b815260040180806020018281038252602c8152602001806112d7602c913960400191505060405180910390fd5b506000908152600260205260409020546001600160a01b031690565b6000610544826106d8565b9050806001600160a01b0316836001600160a01b031614156105975760405162461bcd60e51b815260040180806020018281038252602181526020018061135b6021913960400191505060405180910390fd5b806001600160a01b03166105a9610bd6565b6001600160a01b031614806105ca57506105ca816105c5610bd6565b610b8b565b6106055760405162461bcd60e51b815260040180806020018281038252603881526020018061124c6038913960400191505060405180910390fd5b60008281526002602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b61067261066c610bd6565b82610bda565b6106ad5760405162461bcd60e51b815260040180806020018281038252603181526020018061137c6031913960400191505060405180910390fd5b6106b8838383610c7e565b505050565b6106b883838360405180602001604052806000815250610961565b6000818152600160205260408120546001600160a01b03168061072c5760405162461bcd60e51b81526004018080602001828103825260298152602001806112ae6029913960400191505060405180910390fd5b92915050565b60078054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104cd5780601f106104a2576101008083540402835291602001916104cd565b60006001600160a01b0382166107da5760405162461bcd60e51b815260040180806020018281038252602a815260200180611284602a913960400191505060405180910390fd5b6001600160a01b038216600090815260036020526040902061072c90610dc2565b60068054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156104cd5780601f106104a2576101008083540402835291602001916104cd565b610864610bd6565b6001600160a01b0316826001600160a01b031614156108ca576040805162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b80600460006108d7610bd6565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff19169215159290921790915561091b610bd6565b60408051841515815290516001600160a01b0392909216917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319181900360200190a35050565b61097261096c610bd6565b83610bda565b6109ad5760405162461bcd60e51b815260040180806020018281038252603181526020018061137c6031913960400191505060405180910390fd5b6109b984848484610dc6565b50505050565b60606109ca82610bb9565b610a055760405162461bcd60e51b815260040180806020018281038252602f81526020018061132c602f913960400191505060405180910390fd5b60008281526008602090815260409182902080548351601f6002600019610100600186161502019093169290920491820184900484028101840190945280845260609392830182828015610a9a5780601f10610a6f57610100808354040283529160200191610a9a565b820191906000526020600020905b815481529060010190602001808311610a7d57829003601f168201915b50505050509050805160001415610ac157505060408051602081019091526000815261043c565b6007816040516020018083805460018160011615610100020316600290048015610b225780601f10610b00576101008083540402835291820191610b22565b820191906000526020600020905b815481529060010190602001808311610b0e575b5050825160208401908083835b60208310610b4e5780518252601f199092019160209182019101610b2f565b6001836020036101000a0380198251168184511680821785525050505050509050019250505060405160208183030381529060405291505061043c565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205460ff1690565b6000908152600160205260409020546001600160a01b0316151590565b3390565b6000610be582610bb9565b610c205760405162461bcd60e51b815260040180806020018281038252602c815260200180611220602c913960400191505060405180910390fd5b6000610c2b836106d8565b9050806001600160a01b0316846001600160a01b03161480610c665750836001600160a01b0316610c5b846104d7565b6001600160a01b0316145b80610c765750610c768185610b8b565b949350505050565b826001600160a01b0316610c91826106d8565b6001600160a01b031614610cd65760405162461bcd60e51b81526004018080602001828103825260298152602001806113036029913960400191505060405180910390fd5b6001600160a01b038216610d1b5760405162461bcd60e51b81526004018080602001828103825260248152602001806111fc6024913960400191505060405180910390fd5b610d2481610e18565b6001600160a01b0383166000908152600360205260409020610d4590610e55565b6001600160a01b0382166000908152600360205260409020610d6690610e6c565b60008181526001602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b5490565b610dd1848484610c7e565b610ddd84848484610e75565b6109b95760405162461bcd60e51b81526004018080602001828103825260328152602001806111ca6032913960400191505060405180910390fd5b6000818152600260205260409020546001600160a01b031615610e5257600081815260026020526040902080546001600160a01b03191690555b50565b8054610e6890600163ffffffff6110b016565b9055565b80546001019055565b6000610e89846001600160a01b03166110f9565b610e9557506001610c76565b600060606001600160a01b038616630a85bd0160e11b610eb3610bd6565b89888860405160240180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610f2c578181015183820152602001610f14565b50505050905090810190601f168015610f595780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909a16999099178952518151919890975087965094509250829150849050835b60208310610fc15780518252601f199092019160209182019101610fa2565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611023576040519150601f19603f3d011682016040523d82523d6000602084013e611028565b606091505b509150915081611079578051156110425780518082602001fd5b60405162461bcd60e51b81526004018080602001828103825260328152602001806111ca6032913960400191505060405180910390fd5b600081806020019051602081101561109057600080fd5b50516001600160e01b031916630a85bd0160e11b149350610c7692505050565b60006110f283836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250611132565b9392505050565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470818114801590610c76575050151592915050565b600081848411156111c15760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561118657818101518382015260200161116e565b50505050905090810190601f1680156111b35780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50505090039056fe4552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732314d657461646174613a2055524920717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564a265627a7a72315820e78fca3573b71f1b2808ba4fb8742e9a9c2e89f52b8ee0ee2c7fd3ffcc433c8c64736f6c63430005100032";

    public static final String FUNC_APPROVE = "approve";

    public static final String FUNC_BALANCEOF = "balanceOf";

    public static final String FUNC_GETAPPROVED = "getApproved";

    public static final String FUNC_ISAPPROVEDFORALL = "isApprovedForAll";

    public static final String FUNC_OWNEROF = "ownerOf";

    public static final String FUNC_safeTransferFrom = "safeTransferFrom";

    public static final String FUNC_SETAPPROVALFORALL = "setApprovalForAll";

    public static final String FUNC_SUPPORTSINTERFACE = "supportsInterface";

    public static final String FUNC_TRANSFERFROM = "transferFrom";

    public static final String FUNC_NAME = "name";

    public static final String FUNC_SYMBOL = "symbol";

    public static final String FUNC_TOKENURI = "tokenURI";

    public static final String FUNC_BASEURI = "baseURI";

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
    protected ERC721Metadata(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected ERC721Metadata(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected ERC721Metadata(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected ERC721Metadata(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
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

    public RemoteFunctionCall<TransactionReceipt> transferFrom(String from, String to, BigInteger tokenId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_TRANSFERFROM, 
                Arrays.<Type>asList(new Address(from),
                new Address(to),
                new Uint256(tokenId)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> name() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_NAME, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> symbol() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_SYMBOL, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> tokenURI(BigInteger tokenId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_TOKENURI, 
                Arrays.<Type>asList(new Uint256(tokenId)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> baseURI() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_BASEURI, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    @Deprecated
    public static ERC721Metadata load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new ERC721Metadata(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static ERC721Metadata load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new ERC721Metadata(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static ERC721Metadata load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new ERC721Metadata(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static ERC721Metadata load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new ERC721Metadata(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<ERC721Metadata> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider, String name, String symbol) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new Utf8String(name),
                new Utf8String(symbol)));
        return deployRemoteCall(ERC721Metadata.class, web3j, credentials, contractGasProvider, BINARY, encodedConstructor);
    }

    public static RemoteCall<ERC721Metadata> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider, String name, String symbol) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new Utf8String(name),
                new Utf8String(symbol)));
        return deployRemoteCall(ERC721Metadata.class, web3j, transactionManager, contractGasProvider, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<ERC721Metadata> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit, String name, String symbol) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new Utf8String(name),
                new Utf8String(symbol)));
        return deployRemoteCall(ERC721Metadata.class, web3j, credentials, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<ERC721Metadata> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit, String name, String symbol) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new Utf8String(name),
                new Utf8String(symbol)));
        return deployRemoteCall(ERC721Metadata.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, encodedConstructor);
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
