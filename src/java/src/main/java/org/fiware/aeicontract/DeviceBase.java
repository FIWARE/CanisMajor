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
public class DeviceBase extends Contract {
    public static final String BINARY = "0x608060405234801561001057600080fd5b506102fb806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806310ff8e31146100465780632a08e601146100935780634840c63b146100cb575b600080fd5b6100636004803603602081101561005c57600080fd5b50356100f4565b604080516001600160a01b0390951685526020850193909352838301919091526060830152519081900360800190f35b6100b9600480360360208110156100a957600080fd5b50356001600160a01b0316610135565b60408051918252519081900360200190f35b6100b9600480360360608110156100e157600080fd5b5080359060208101359060400135610147565b6000818154811061010157fe5b600091825260209091206004909102018054600182015460028301546003909301546001600160a01b039092169350919084565b60016020526000908152604090205481565b600061015161029f565b50604080516080810182523380825260208083018881528385018881526060808601898152600080546001808201835582805289517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5636004840290810180546001600160a01b0319166001600160a01b039093169290921790915596517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56488015594517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56587015591517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5669095019490945585845282855292879020805490920190915585518a815292830189905282860188905294519394909384927f093aad13dfa930f4f2311a7f59be1c3674ccc072b729756c22447948a2c0520092908290030190a395945050505050565b6040805160808101825260008082526020820181905291810182905260608101919091529056fea265627a7a7231582085a361b3d9a0c5cca3a76fa58aa51d4686de7c63807f35983aaff4957efd686264736f6c63430005100032";

    public static final String FUNC_DEVICES = "devices";

    public static final String FUNC_OWNERDEVICECOUNT = "ownerDeviceCount";

    public static final String FUNC_CREATEDEVICE = "createDevice";

    public static final Event DEVICECREATED_EVENT = new Event("DeviceCreated", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Bytes32>() {}, new TypeReference<Bytes32>() {}, new TypeReference<Bytes32>() {}));
    ;

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
    }

    @Deprecated
    protected DeviceBase(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected DeviceBase(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected DeviceBase(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected DeviceBase(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
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

    public RemoteFunctionCall<TransactionReceipt> createDevice(byte[] _identifier, byte[] _metadataHash, byte[] _firmwareHash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_CREATEDEVICE, 
                Arrays.<Type>asList(new Bytes32(_identifier),
                new Bytes32(_metadataHash),
                new Bytes32(_firmwareHash)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static DeviceBase load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new DeviceBase(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static DeviceBase load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new DeviceBase(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static DeviceBase load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new DeviceBase(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static DeviceBase load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new DeviceBase(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<DeviceBase> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(DeviceBase.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<DeviceBase> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(DeviceBase.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<DeviceBase> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(DeviceBase.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<DeviceBase> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(DeviceBase.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
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
