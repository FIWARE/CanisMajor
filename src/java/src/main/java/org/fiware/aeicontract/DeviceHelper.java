package org.fiware.aeicontract;

import io.reactivex.Flowable;
import io.reactivex.functions.Function;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Bytes32;
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
import org.web3j.tuples.generated.Tuple4;
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
public class DeviceHelper extends Contract {
    public static final String BINARY = "0x608060405234801561001057600080fd5b506108cc806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806351b0e9871161005b57806351b0e9871461016c5780638e9075be146101e2578063b22d439d14610294578063c40613df146102b757610088565b80630bcb88e81461008d57806310ff8e31146100be5780632a08e6011461010b5780634840c63b14610143575b600080fd5b6100aa600480360360208110156100a357600080fd5b5035610363565b604080519115158252519081900360200190f35b6100db600480360360208110156100d457600080fd5b50356103bd565b604080516001600160a01b0390951685526020850193909352838301919091526060830152519081900360800190f35b6101316004803603602081101561012157600080fd5b50356001600160a01b03166103fe565b60408051918252519081900360200190f35b6101316004803603606081101561015957600080fd5b5080359060208101359060400135610410565b6101926004803603602081101561018257600080fd5b50356001600160a01b0316610568565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156101ce5781810151838201526020016101b6565b505050509050019250505060405180910390f35b6100aa600480360360608110156101f857600080fd5b81359160208101359181019060608101604082013564010000000081111561021f57600080fd5b82018360208201111561023157600080fd5b8035906020019184600183028401116401000000008311171561025357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610632945050505050565b6100aa600480360360408110156102aa57600080fd5b508035906020013561067a565b6100aa600480360360608110156102cd57600080fd5b813591908101906040810160208201356401000000008111156102ef57600080fd5b82018360208201111561030157600080fd5b8035906020019184602083028401116401000000008311171561032357600080fd5b91908080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525092955050913592506106a6915050565b600080828154811061037157fe5b90600052602060002090600402016001015460001c6001600160a01b03166000838154811061039c57fe5b60009182526020909120600490910201546001600160a01b03161492915050565b600081815481106103ca57fe5b600091825260209091206004909102018054600182015460028301546003909301546001600160a01b039092169350919084565b60016020526000908152604090205481565b600061041a610870565b50604080516080810182523380825260208083018881528385018881526060808601898152600080546001808201835582805289517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5636004840290810180546001600160a01b0319166001600160a01b039093169290921790915596517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56488015594517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56587015591517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5669095019490945585845282855292879020805490920190915585518a815292830189905282860188905294519394909384927f093aad13dfa930f4f2311a7f59be1c3674ccc072b729756c22447948a2c0520092908290030190a395945050505050565b60608060016000846001600160a01b03166001600160a01b03168152602001908152602001600020546040519080825280602002602001820160405280156105ba578160200160208202803883390190505b5090506000805b60005481101561062957846001600160a01b0316600082815481106105e257fe5b60009182526020909120600490910201546001600160a01b03161415610621578083838151811061060f57fe5b60209081029190910101526001909101905b6001016105c1565b50909392505050565b600080848154811061064057fe5b90600052602060002090600402016001015460001c6001600160a01b031661066884846106d9565b6001600160a01b031614949350505050565b6000816000848154811061068a57fe5b9060005260206000209060040201600301541490505b92915050565b60006106d183600086815481106106b957fe5b906000526020600020906004020160020154846107c7565b949350505050565b600081516041146106ec575060006106a0565b60208201516040830151606084015160001a7f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a082111561073257600093505050506106a0565b8060ff16601b1415801561074a57508060ff16601c14155b1561075b57600093505050506106a0565b6040805160008152602080820180845289905260ff8416828401526060820186905260808201859052915160019260a0808401939192601f1981019281900390910190855afa1580156107b2573d6000803e3d6000fd5b5050604051601f190151979650505050505050565b600081815b85518110156108655760008682815181106107e357fe5b6020026020010151905080831161082a578281604051602001808381526020018281526020019250505060405160208183030381529060405280519060200120925061085c565b808360405160200180838152602001828152602001925050506040516020818303038152906040528051906020012092505b506001016107cc565b509092149392505050565b6040805160808101825260008082526020820181905291810182905260608101919091529056fea265627a7a723158204e29fc1430f20bb3e91438e69c47f76e098c9278229e5f462545260d8e12ad5864736f6c63430005100032";

    public static final String FUNC_CREATEDEVICE = "createDevice";

    public static final String FUNC_DEVICES = "devices";

    public static final String FUNC_OWNERDEVICECOUNT = "ownerDeviceCount";

    public static final String FUNC_GETDEVICESBYOWNER = "getDevicesByOwner";

    public static final String FUNC_ISDEVICEANENTITY = "isDeviceAnEntity";

    public static final String FUNC_ISVALIDMETADATAMEMBER = "isValidMetadataMember";

    public static final String FUNC_ISVALIDFIRMWAREHASH = "isValidFirmwareHash";

    public static final String FUNC_ISVALIDETHMESSAGE = "isValidEthMessage";

    public static final Event DEVICECREATED_EVENT = new Event("DeviceCreated", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Bytes32>() {}, new TypeReference<Bytes32>() {}, new TypeReference<Bytes32>() {}));
    ;

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
    }

    @Deprecated
    protected DeviceHelper(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected DeviceHelper(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected DeviceHelper(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected DeviceHelper(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public List<DeviceCreatedEventResponse> getDeviceCreatedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(DEVICECREATED_EVENT, transactionReceipt);
        ArrayList<DeviceCreatedEventResponse> responses = new ArrayList<DeviceCreatedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            DeviceCreatedEventResponse typedResponse = new DeviceCreatedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.deviceId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.owner = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.identifier = (byte[]) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.metadataHash = (byte[]) eventValues.getNonIndexedValues().get(1).getValue();
            typedResponse.firmwareHash = (byte[]) eventValues.getNonIndexedValues().get(2).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<DeviceCreatedEventResponse> deviceCreatedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, DeviceCreatedEventResponse>() {
            @Override
            public DeviceCreatedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(DEVICECREATED_EVENT, log);
                DeviceCreatedEventResponse typedResponse = new DeviceCreatedEventResponse();
                typedResponse.log = log;
                typedResponse.deviceId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.owner = (String) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.identifier = (byte[]) eventValues.getNonIndexedValues().get(0).getValue();
                typedResponse.metadataHash = (byte[]) eventValues.getNonIndexedValues().get(1).getValue();
                typedResponse.firmwareHash = (byte[]) eventValues.getNonIndexedValues().get(2).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<DeviceCreatedEventResponse> deviceCreatedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(DEVICECREATED_EVENT));
        return deviceCreatedEventFlowable(filter);
    }

    public RemoteFunctionCall<TransactionReceipt> createDevice(byte[] _identifier, byte[] _metadataHash, byte[] _firmwareHash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_CREATEDEVICE, 
                Arrays.<Type>asList(new Bytes32(_identifier),
                new Bytes32(_metadataHash),
                new Bytes32(_firmwareHash)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Tuple4<String, byte[], byte[], byte[]>> devices(BigInteger param0) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_DEVICES, 
                Arrays.<Type>asList(new Uint256(param0)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Bytes32>() {}, new TypeReference<Bytes32>() {}, new TypeReference<Bytes32>() {}));
        return new RemoteFunctionCall<Tuple4<String, byte[], byte[], byte[]>>(function,
                new Callable<Tuple4<String, byte[], byte[], byte[]>>() {
                    @Override
                    public Tuple4<String, byte[], byte[], byte[]> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<String, byte[], byte[], byte[]>(
                                (String) results.get(0).getValue(), 
                                (byte[]) results.get(1).getValue(), 
                                (byte[]) results.get(2).getValue(), 
                                (byte[]) results.get(3).getValue());
                    }
                });
    }

    public RemoteFunctionCall<BigInteger> ownerDeviceCount(String param0) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_OWNERDEVICECOUNT, 
                Arrays.<Type>asList(new Address(param0)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<List> getDevicesByOwner(String _owner) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_GETDEVICESBYOWNER, 
                Arrays.<Type>asList(new Address(_owner)),
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<Uint256>>() {}));
        return new RemoteFunctionCall<List>(function,
                new Callable<List>() {
                    @Override
                    @SuppressWarnings("unchecked")
                    public List call() throws Exception {
                        List<Type> result = (List<Type>) executeCallSingleValueReturn(function, List.class);
                        return convertToNative(result);
                    }
                });
    }

    public RemoteFunctionCall<Boolean> isDeviceAnEntity(BigInteger _deviceId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ISDEVICEANENTITY, 
                Arrays.<Type>asList(new Uint256(_deviceId)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<Boolean> isValidMetadataMember(BigInteger _deviceId, List<byte[]> _proof, byte[] _leaf) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ISVALIDMETADATAMEMBER, 
                Arrays.<Type>asList(new Uint256(_deviceId),
                new DynamicArray<Bytes32>(
                        Bytes32.class,
                        org.web3j.abi.Utils.typeMap(_proof, Bytes32.class)),
                new Bytes32(_leaf)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<Boolean> isValidFirmwareHash(BigInteger _deviceId, byte[] _firmwareHash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ISVALIDFIRMWAREHASH, 
                Arrays.<Type>asList(new Uint256(_deviceId),
                new Bytes32(_firmwareHash)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<Boolean> isValidEthMessage(BigInteger _deviceId, byte[] _messageHash, byte[] _signature) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ISVALIDETHMESSAGE, 
                Arrays.<Type>asList(new Uint256(_deviceId),
                new Bytes32(_messageHash),
                new org.web3j.abi.datatypes.DynamicBytes(_signature)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    @Deprecated
    public static DeviceHelper load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new DeviceHelper(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static DeviceHelper load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new DeviceHelper(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static DeviceHelper load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new DeviceHelper(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static DeviceHelper load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new DeviceHelper(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<DeviceHelper> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(DeviceHelper.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<DeviceHelper> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(DeviceHelper.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<DeviceHelper> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(DeviceHelper.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<DeviceHelper> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(DeviceHelper.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    protected String getStaticDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static String getPreviouslyDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static class DeviceCreatedEventResponse extends BaseEventResponse {
        public BigInteger deviceId;

        public String owner;

        public byte[] identifier;

        public byte[] metadataHash;

        public byte[] firmwareHash;
    }
}
