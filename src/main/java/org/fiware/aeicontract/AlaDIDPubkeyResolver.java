package org.fiware.aeicontract;

import io.reactivex.Flowable;
import io.reactivex.functions.Function;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple4;
import org.web3j.tuples.generated.Tuple5;
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
public class AlaDIDPubkeyResolver extends Contract {
    public static final String BINARY = "Bin file was not provided";

    public static final String FUNC_ADDPUBLICKEY = "addPublicKey";

    public static final String FUNC_DELETEPUBLICKEY = "deletePublicKey";

    public static final String FUNC_HASH = "hash";

    public static final String FUNC_PUBLICKEY = "publicKey";

    public static final String FUNC_PUBLICKEYATINDEX = "publicKeyAtIndex";

    public static final String FUNC_REVOKEPUBLICKEY = "revokePublicKey";

    public static final String FUNC_SUPPORTSINTERFACE = "supportsInterface";

    public static final Event ALADIDPUBKEYADDED_EVENT = new Event("AlaDIDPubkeyAdded", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Utf8String>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    public static final Event ALADIDPUBKEYDELETED_EVENT = new Event("AlaDIDPubkeyDeleted", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Utf8String>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    public static final Event ALADIDPUBKEYREVOKED_EVENT = new Event("AlaDIDPubkeyRevoked", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Utf8String>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    @Deprecated
    protected AlaDIDPubkeyResolver(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected AlaDIDPubkeyResolver(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected AlaDIDPubkeyResolver(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected AlaDIDPubkeyResolver(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public List<AlaDIDPubkeyAddedEventResponse> getAlaDIDPubkeyAddedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(ALADIDPUBKEYADDED_EVENT, transactionReceipt);
        ArrayList<AlaDIDPubkeyAddedEventResponse> responses = new ArrayList<AlaDIDPubkeyAddedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            AlaDIDPubkeyAddedEventResponse typedResponse = new AlaDIDPubkeyAddedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.indexedKey = (byte[]) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.keyID = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<AlaDIDPubkeyAddedEventResponse> alaDIDPubkeyAddedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, AlaDIDPubkeyAddedEventResponse>() {
            @Override
            public AlaDIDPubkeyAddedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(ALADIDPUBKEYADDED_EVENT, log);
                AlaDIDPubkeyAddedEventResponse typedResponse = new AlaDIDPubkeyAddedEventResponse();
                typedResponse.log = log;
                typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.indexedKey = (byte[]) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.keyID = (String) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<AlaDIDPubkeyAddedEventResponse> alaDIDPubkeyAddedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(ALADIDPUBKEYADDED_EVENT));
        return alaDIDPubkeyAddedEventFlowable(filter);
    }

    public List<AlaDIDPubkeyDeletedEventResponse> getAlaDIDPubkeyDeletedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(ALADIDPUBKEYDELETED_EVENT, transactionReceipt);
        ArrayList<AlaDIDPubkeyDeletedEventResponse> responses = new ArrayList<AlaDIDPubkeyDeletedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            AlaDIDPubkeyDeletedEventResponse typedResponse = new AlaDIDPubkeyDeletedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.indexedKey = (byte[]) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.keyID = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<AlaDIDPubkeyDeletedEventResponse> alaDIDPubkeyDeletedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, AlaDIDPubkeyDeletedEventResponse>() {
            @Override
            public AlaDIDPubkeyDeletedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(ALADIDPUBKEYDELETED_EVENT, log);
                AlaDIDPubkeyDeletedEventResponse typedResponse = new AlaDIDPubkeyDeletedEventResponse();
                typedResponse.log = log;
                typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.indexedKey = (byte[]) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.keyID = (String) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<AlaDIDPubkeyDeletedEventResponse> alaDIDPubkeyDeletedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(ALADIDPUBKEYDELETED_EVENT));
        return alaDIDPubkeyDeletedEventFlowable(filter);
    }

    public List<AlaDIDPubkeyRevokedEventResponse> getAlaDIDPubkeyRevokedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(ALADIDPUBKEYREVOKED_EVENT, transactionReceipt);
        ArrayList<AlaDIDPubkeyRevokedEventResponse> responses = new ArrayList<AlaDIDPubkeyRevokedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            AlaDIDPubkeyRevokedEventResponse typedResponse = new AlaDIDPubkeyRevokedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.indexedKey = (byte[]) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.keyID = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<AlaDIDPubkeyRevokedEventResponse> alaDIDPubkeyRevokedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, AlaDIDPubkeyRevokedEventResponse>() {
            @Override
            public AlaDIDPubkeyRevokedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(ALADIDPUBKEYREVOKED_EVENT, log);
                AlaDIDPubkeyRevokedEventResponse typedResponse = new AlaDIDPubkeyRevokedEventResponse();
                typedResponse.log = log;
                typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.indexedKey = (byte[]) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.keyID = (String) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<AlaDIDPubkeyRevokedEventResponse> alaDIDPubkeyRevokedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(ALADIDPUBKEYREVOKED_EVENT));
        return alaDIDPubkeyRevokedEventFlowable(filter);
    }

    public RemoteFunctionCall<TransactionReceipt> addPublicKey(byte[] node, String keyID, String keyValue) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_ADDPUBLICKEY, 
                Arrays.<Type>asList(new Bytes32(node),
                new Utf8String(keyID),
                new Utf8String(keyValue)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> deletePublicKey(byte[] node, String keyID, BigInteger index) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_DELETEPUBLICKEY, 
                Arrays.<Type>asList(new Bytes32(node),
                new Utf8String(keyID),
                new Uint256(index)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<byte[]> hash(String data) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_HASH, 
                Arrays.<Type>asList(new Utf8String(data)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>() {}));
        return executeRemoteCallSingleValueReturn(function, byte[].class);
    }

    public RemoteFunctionCall<Tuple5<BigInteger, BigInteger, BigInteger, String, BigInteger>> publicKey(byte[] node, String keyID) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_PUBLICKEY, 
                Arrays.<Type>asList(new Bytes32(node),
                new Utf8String(keyID)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint8>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple5<BigInteger, BigInteger, BigInteger, String, BigInteger>>(function,
                new Callable<Tuple5<BigInteger, BigInteger, BigInteger, String, BigInteger>>() {
                    @Override
                    public Tuple5<BigInteger, BigInteger, BigInteger, String, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple5<BigInteger, BigInteger, BigInteger, String, BigInteger>(
                                (BigInteger) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (String) results.get(3).getValue(), 
                                (BigInteger) results.get(4).getValue());
                    }
                });
    }

    public RemoteFunctionCall<Tuple4<BigInteger, BigInteger, BigInteger, String>> publicKeyAtIndex(byte[] node, String keyID, BigInteger index) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_PUBLICKEYATINDEX, 
                Arrays.<Type>asList(new Bytes32(node),
                new Utf8String(keyID),
                new Uint256(index)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint8>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Utf8String>() {}));
        return new RemoteFunctionCall<Tuple4<BigInteger, BigInteger, BigInteger, String>>(function,
                new Callable<Tuple4<BigInteger, BigInteger, BigInteger, String>>() {
                    @Override
                    public Tuple4<BigInteger, BigInteger, BigInteger, String> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<BigInteger, BigInteger, BigInteger, String>(
                                (BigInteger) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (String) results.get(3).getValue());
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> revokePublicKey(byte[] node, String keyID, BigInteger index) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_REVOKEPUBLICKEY, 
                Arrays.<Type>asList(new Bytes32(node),
                new Utf8String(keyID),
                new Uint256(index)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Boolean> supportsInterface(byte[] interfaceID) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_SUPPORTSINTERFACE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes4(interfaceID)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    @Deprecated
    public static AlaDIDPubkeyResolver load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new AlaDIDPubkeyResolver(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static AlaDIDPubkeyResolver load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new AlaDIDPubkeyResolver(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static AlaDIDPubkeyResolver load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new AlaDIDPubkeyResolver(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static AlaDIDPubkeyResolver load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new AlaDIDPubkeyResolver(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static class AlaDIDPubkeyAddedEventResponse extends BaseEventResponse {
        public byte[] node;

        public byte[] indexedKey;

        public String keyID;
    }

    public static class AlaDIDPubkeyDeletedEventResponse extends BaseEventResponse {
        public byte[] node;

        public byte[] indexedKey;

        public String keyID;
    }

    public static class AlaDIDPubkeyRevokedEventResponse extends BaseEventResponse {
        public byte[] node;

        public byte[] indexedKey;

        public String keyID;
    }
}
