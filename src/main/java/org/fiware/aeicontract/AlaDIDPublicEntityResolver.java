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
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
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
public class AlaDIDPublicEntityResolver extends Contract {
    public static final String BINARY = "Bin file was not provided";

    public static final String FUNC_ALADIDPUBLICENTITY = "AlaDIDPublicEntity";

    public static final String FUNC_ADDRESSFROMDID = "addressFromDID";

    public static final String FUNC_HASH = "hash";

    public static final String FUNC_NODEFROMDID = "nodeFromDID";

    public static final String FUNC_SETALADIDDOCUMENT = "setAlaDIDDocument";

    public static final String FUNC_SETALADIDPUBLICENTITY = "setAlaDIDPublicEntity";

    public static final String FUNC_SUPPORTSINTERFACE = "supportsInterface";

    public static final Event ALADIDDOCUMENTCHANGED_EVENT = new Event("AlaDIDDocumentChanged", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    @Deprecated
    protected AlaDIDPublicEntityResolver(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected AlaDIDPublicEntityResolver(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected AlaDIDPublicEntityResolver(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected AlaDIDPublicEntityResolver(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public List<AlaDIDDocumentChangedEventResponse> getAlaDIDDocumentChangedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(ALADIDDOCUMENTCHANGED_EVENT, transactionReceipt);
        ArrayList<AlaDIDDocumentChangedEventResponse> responses = new ArrayList<AlaDIDDocumentChangedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            AlaDIDDocumentChangedEventResponse typedResponse = new AlaDIDDocumentChangedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.document = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<AlaDIDDocumentChangedEventResponse> alaDIDDocumentChangedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, AlaDIDDocumentChangedEventResponse>() {
            @Override
            public AlaDIDDocumentChangedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(ALADIDDOCUMENTCHANGED_EVENT, log);
                AlaDIDDocumentChangedEventResponse typedResponse = new AlaDIDDocumentChangedEventResponse();
                typedResponse.log = log;
                typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.document = (String) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<AlaDIDDocumentChangedEventResponse> alaDIDDocumentChangedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(ALADIDDOCUMENTCHANGED_EVENT));
        return alaDIDDocumentChangedEventFlowable(filter);
    }

    public RemoteFunctionCall<Tuple4<byte[], String, String, Boolean>> AlaDIDPublicEntity(byte[] node) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ALADIDPUBLICENTITY, 
                Arrays.<Type>asList(new Bytes32(node)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Bool>() {}));
        return new RemoteFunctionCall<Tuple4<byte[], String, String, Boolean>>(function,
                new Callable<Tuple4<byte[], String, String, Boolean>>() {
                    @Override
                    public Tuple4<byte[], String, String, Boolean> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<byte[], String, String, Boolean>(
                                (byte[]) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (String) results.get(2).getValue(), 
                                (Boolean) results.get(3).getValue());
                    }
                });
    }

    public RemoteFunctionCall<String> addressFromDID(byte[] _DIDHash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ADDRESSFROMDID, 
                Arrays.<Type>asList(new Bytes32(_DIDHash)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<byte[]> hash(String data) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_HASH, 
                Arrays.<Type>asList(new Utf8String(data)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>() {}));
        return executeRemoteCallSingleValueReturn(function, byte[].class);
    }

    public RemoteFunctionCall<byte[]> nodeFromDID(byte[] _DIDHash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_NODEFROMDID, 
                Arrays.<Type>asList(new Bytes32(_DIDHash)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>() {}));
        return executeRemoteCallSingleValueReturn(function, byte[].class);
    }

    public RemoteFunctionCall<TransactionReceipt> setAlaDIDDocument(byte[] _DIDHash, String _DIDDocument) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SETALADIDDOCUMENT, 
                Arrays.<Type>asList(new Bytes32(_DIDHash),
                new Utf8String(_DIDDocument)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> setAlaDIDPublicEntity(byte[] node, byte[] label, byte[] _DIDHash, String _domain_name, String _DIDDocument, Boolean _active, String _owner) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SETALADIDPUBLICENTITY, 
                Arrays.<Type>asList(new Bytes32(node),
                new Bytes32(label),
                new Bytes32(_DIDHash),
                new Utf8String(_domain_name),
                new Utf8String(_DIDDocument),
                new Bool(_active),
                new Address(160, _owner)),
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
    public static AlaDIDPublicEntityResolver load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new AlaDIDPublicEntityResolver(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static AlaDIDPublicEntityResolver load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new AlaDIDPublicEntityResolver(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static AlaDIDPublicEntityResolver load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new AlaDIDPublicEntityResolver(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static AlaDIDPublicEntityResolver load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new AlaDIDPublicEntityResolver(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static class AlaDIDDocumentChangedEventResponse extends BaseEventResponse {
        public byte[] node;

        public String document;
    }
}
