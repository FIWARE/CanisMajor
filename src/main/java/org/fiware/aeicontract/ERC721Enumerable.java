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
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
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
public class ERC721Enumerable extends Contract {
    public static final String BINARY = "0x608060405234801561001057600080fd5b5061002a6301ffc9a760e01b6001600160e01b0361006116565b6100436380ac58cd60e01b6001600160e01b0361006116565b61005c63780e9d6360e01b6001600160e01b0361006116565b6100e5565b6001600160e01b031980821614156100c0576040805162461bcd60e51b815260206004820152601c60248201527f4552433136353a20696e76616c696420696e7465726661636520696400000000604482015290519081900360640190fd5b6001600160e01b0319166000908152602081905260409020805460ff19166001179055565b6112e8806100f46000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806342842e0e1161008c57806370a082311161006657806370a0823114610262578063a22cb46514610288578063b88d4fde146102b6578063e985e9c51461037c576100cf565b806342842e0e146101f25780634f6ccce7146102285780636352211e14610245576100cf565b806301ffc9a7146100d4578063081812fc1461010f578063095ea7b31461014857806318160ddd1461017657806323b872dd146101905780632f745c59146101c6575b600080fd5b6100fb600480360360208110156100ea57600080fd5b50356001600160e01b0319166103aa565b604080519115158252519081900360200190f35b61012c6004803603602081101561012557600080fd5b50356103c9565b604080516001600160a01b039092168252519081900360200190f35b6101746004803603604081101561015e57600080fd5b506001600160a01b03813516906020013561042b565b005b61017e610553565b60408051918252519081900360200190f35b610174600480360360608110156101a657600080fd5b506001600160a01b0381358116916020810135909116906040013561055a565b61017e600480360360408110156101dc57600080fd5b506001600160a01b0381351690602001356105b6565b6101746004803603606081101561020857600080fd5b506001600160a01b03813581169160208101359091169060400135610635565b61017e6004803603602081101561023e57600080fd5b5035610650565b61012c6004803603602081101561025b57600080fd5b50356106b6565b61017e6004803603602081101561027857600080fd5b50356001600160a01b0316610710565b6101746004803603604081101561029e57600080fd5b506001600160a01b0381351690602001351515610778565b610174600480360360808110156102cc57600080fd5b6001600160a01b0382358116926020810135909116916040820135919081019060808101606082013564010000000081111561030757600080fd5b82018360208201111561031957600080fd5b8035906020019184600183028401116401000000008311171561033b57600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061087d945050505050565b6100fb6004803603604081101561039257600080fd5b506001600160a01b03813581169160200135166108db565b6001600160e01b03191660009081526020819052604090205460ff1690565b60006103d482610909565b61040f5760405162461bcd60e51b815260040180806020018281038252602c8152602001806111e1602c913960400191505060405180910390fd5b506000908152600260205260409020546001600160a01b031690565b6000610436826106b6565b9050806001600160a01b0316836001600160a01b031614156104895760405162461bcd60e51b81526004018080602001828103825260218152602001806112366021913960400191505060405180910390fd5b806001600160a01b031661049b610926565b6001600160a01b031614806104bc57506104bc816104b7610926565b6108db565b6104f75760405162461bcd60e51b81526004018080602001828103825260388152602001806111566038913960400191505060405180910390fd5b60008281526002602052604080822080546001600160a01b0319166001600160a01b0387811691821790925591518593918516917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591a4505050565b6007545b90565b61056b610565610926565b8261092a565b6105a65760405162461bcd60e51b81526004018080602001828103825260318152602001806112576031913960400191505060405180910390fd5b6105b18383836109ce565b505050565b60006105c183610710565b82106105fe5760405162461bcd60e51b815260040180806020018281038252602b8152602001806110a9602b913960400191505060405180910390fd5b6001600160a01b038316600090815260056020526040902080548390811061062257fe5b9060005260206000200154905092915050565b6105b18383836040518060200160405280600081525061087d565b600061065a610553565b82106106975760405162461bcd60e51b815260040180806020018281038252602c815260200180611288602c913960400191505060405180910390fd5b600782815481106106a457fe5b90600052602060002001549050919050565b6000818152600160205260408120546001600160a01b03168061070a5760405162461bcd60e51b81526004018080602001828103825260298152602001806111b86029913960400191505060405180910390fd5b92915050565b60006001600160a01b0382166107575760405162461bcd60e51b815260040180806020018281038252602a81526020018061118e602a913960400191505060405180910390fd5b6001600160a01b038216600090815260036020526040902061070a906109ed565b610780610926565b6001600160a01b0316826001600160a01b031614156107e6576040805162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015290519081900360640190fd5b80600460006107f3610926565b6001600160a01b03908116825260208083019390935260409182016000908120918716808252919093529120805460ff191692151592909217909155610837610926565b60408051841515815290516001600160a01b0392909216917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319181900360200190a35050565b61088e610888610926565b8361092a565b6108c95760405162461bcd60e51b81526004018080602001828103825260318152602001806112576031913960400191505060405180910390fd5b6108d5848484846109f1565b50505050565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205460ff1690565b6000908152600160205260409020546001600160a01b0316151590565b3390565b600061093582610909565b6109705760405162461bcd60e51b815260040180806020018281038252602c81526020018061112a602c913960400191505060405180910390fd5b600061097b836106b6565b9050806001600160a01b0316846001600160a01b031614806109b65750836001600160a01b03166109ab846103c9565b6001600160a01b0316145b806109c657506109c681856108db565b949350505050565b6109d9838383610a43565b6109e38382610b87565b6105b18282610c7c565b5490565b6109fc8484846109ce565b610a0884848484610cba565b6108d55760405162461bcd60e51b81526004018080602001828103825260328152602001806110d46032913960400191505060405180910390fd5b826001600160a01b0316610a56826106b6565b6001600160a01b031614610a9b5760405162461bcd60e51b815260040180806020018281038252602981526020018061120d6029913960400191505060405180910390fd5b6001600160a01b038216610ae05760405162461bcd60e51b81526004018080602001828103825260248152602001806111066024913960400191505060405180910390fd5b610ae981610ef5565b6001600160a01b0383166000908152600360205260409020610b0a90610f32565b6001600160a01b0382166000908152600360205260409020610b2b90610f49565b60008181526001602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b038216600090815260056020526040812054610bb190600163ffffffff610f5216565b600083815260066020526040902054909150808214610c4c576001600160a01b0384166000908152600560205260408120805484908110610bee57fe5b906000526020600020015490508060056000876001600160a01b03166001600160a01b031681526020019081526020016000208381548110610c2c57fe5b600091825260208083209091019290925591825260069052604090208190555b6001600160a01b0384166000908152600560205260409020805490610c7590600019830161106b565b5050505050565b6001600160a01b0390911660009081526005602081815260408084208054868652600684529185208290559282526001810183559183529091200155565b6000610cce846001600160a01b0316610f9b565b610cda575060016109c6565b600060606001600160a01b038616630a85bd0160e11b610cf8610926565b89888860405160240180856001600160a01b03166001600160a01b03168152602001846001600160a01b03166001600160a01b0316815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610d71578181015183820152602001610d59565b50505050905090810190601f168015610d9e5780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909a16999099178952518151919890975087965094509250829150849050835b60208310610e065780518252601f199092019160209182019101610de7565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114610e68576040519150601f19603f3d011682016040523d82523d6000602084013e610e6d565b606091505b509150915081610ebe57805115610e875780518082602001fd5b60405162461bcd60e51b81526004018080602001828103825260328152602001806110d46032913960400191505060405180910390fd5b6000818060200190516020811015610ed557600080fd5b50516001600160e01b031916630a85bd0160e11b1493506109c692505050565b6000818152600260205260409020546001600160a01b031615610f2f57600081815260026020526040902080546001600160a01b03191690555b50565b8054610f4590600163ffffffff610f5216565b9055565b80546001019055565b6000610f9483836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610fd4565b9392505050565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4708181148015906109c6575050151592915050565b600081848411156110635760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611028578181015183820152602001611010565b50505050905090810190601f1680156110555780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b8154818355818111156105b1576000838152602090206105b191810190830161055791905b808211156110a45760008155600101611090565b509056fe455243373231456e756d657261626c653a206f776e657220696e646578206f7574206f6620626f756e64734552433732313a207472616e7366657220746f206e6f6e20455243373231526563656976657220696d706c656d656e7465724552433732313a207472616e7366657220746f20746865207a65726f20616464726573734552433732313a206f70657261746f7220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76652063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656420666f7220616c6c4552433732313a2062616c616e636520717565727920666f7220746865207a65726f20616464726573734552433732313a206f776e657220717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a20617070726f76656420717565727920666f72206e6f6e6578697374656e7420746f6b656e4552433732313a207472616e73666572206f6620746f6b656e2074686174206973206e6f74206f776e4552433732313a20617070726f76616c20746f2063757272656e74206f776e65724552433732313a207472616e736665722063616c6c6572206973206e6f74206f776e6572206e6f7220617070726f766564455243373231456e756d657261626c653a20676c6f62616c20696e646578206f7574206f6620626f756e6473a265627a7a723158209319cc3d6dd6237a63c1bd8c4722791a5222997ed58433759161b6735bd33ea764736f6c63430005100032";

    public static final String FUNC_APPROVE = "approve";

    public static final String FUNC_BALANCEOF = "balanceOf";

    public static final String FUNC_GETAPPROVED = "getApproved";

    public static final String FUNC_ISAPPROVEDFORALL = "isApprovedForAll";

    public static final String FUNC_OWNEROF = "ownerOf";

    public static final String FUNC_safeTransferFrom = "safeTransferFrom";

    public static final String FUNC_SETAPPROVALFORALL = "setApprovalForAll";

    public static final String FUNC_SUPPORTSINTERFACE = "supportsInterface";

    public static final String FUNC_TRANSFERFROM = "transferFrom";

    public static final String FUNC_TOKENOFOWNERBYINDEX = "tokenOfOwnerByIndex";

    public static final String FUNC_TOTALSUPPLY = "totalSupply";

    public static final String FUNC_TOKENBYINDEX = "tokenByIndex";

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
    protected ERC721Enumerable(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected ERC721Enumerable(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected ERC721Enumerable(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected ERC721Enumerable(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
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

    public RemoteFunctionCall<BigInteger> tokenOfOwnerByIndex(String owner, BigInteger index) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_TOKENOFOWNERBYINDEX, 
                Arrays.<Type>asList(new Address(owner),
                new Uint256(index)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> totalSupply() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_TOTALSUPPLY, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> tokenByIndex(BigInteger index) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_TOKENBYINDEX, 
                Arrays.<Type>asList(new Uint256(index)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    @Deprecated
    public static ERC721Enumerable load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new ERC721Enumerable(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static ERC721Enumerable load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new ERC721Enumerable(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static ERC721Enumerable load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new ERC721Enumerable(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static ERC721Enumerable load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new ERC721Enumerable(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<ERC721Enumerable> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(ERC721Enumerable.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    public static RemoteCall<ERC721Enumerable> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(ERC721Enumerable.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<ERC721Enumerable> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(ERC721Enumerable.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<ERC721Enumerable> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(ERC721Enumerable.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
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
