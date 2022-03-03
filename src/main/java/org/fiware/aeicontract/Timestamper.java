package org.fiware.aeicontract;

import io.reactivex.Flowable;
import io.reactivex.functions.Function;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
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
public class Timestamper extends Contract {
    public static final String BINARY = "Bin file was not provided";

    public static final String FUNC_BATCHTIMESTAMP = "batchTimestamp";

    public static final String FUNC_TIMESTAMP = "timestamp";

    public static final Event TIMESTAMP_EVENT = new Event("Timestamp", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Uint256>(true) {}));
    ;

    @Deprecated
    protected Timestamper(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Timestamper(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Timestamper(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Timestamper(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public List<TimestampEventResponse> getTimestampEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(TIMESTAMP_EVENT, transactionReceipt);
        ArrayList<TimestampEventResponse> responses = new ArrayList<TimestampEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            TimestampEventResponse typedResponse = new TimestampEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.id_hash = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.value_hash = (BigInteger) eventValues.getIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<TimestampEventResponse> timestampEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, TimestampEventResponse>() {
            @Override
            public TimestampEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(TIMESTAMP_EVENT, log);
                TimestampEventResponse typedResponse = new TimestampEventResponse();
                typedResponse.log = log;
                typedResponse.id_hash = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.value_hash = (BigInteger) eventValues.getIndexedValues().get(1).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<TimestampEventResponse> timestampEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(TIMESTAMP_EVENT));
        return timestampEventFlowable(filter);
    }

    public RemoteFunctionCall<TransactionReceipt> batchTimestamp(List<BigInteger> id_hashes, List<BigInteger> value_hashes) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_BATCHTIMESTAMP, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.DynamicArray<Uint256>(
                        Uint256.class,
                        org.web3j.abi.Utils.typeMap(id_hashes, Uint256.class)),
                new org.web3j.abi.datatypes.DynamicArray<Uint256>(
                        Uint256.class,
                        org.web3j.abi.Utils.typeMap(value_hashes, Uint256.class))),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> timestamp(BigInteger id_hash, BigInteger value_hash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_TIMESTAMP, 
                Arrays.<Type>asList(new Uint256(id_hash),
                new Uint256(value_hash)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static Timestamper load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Timestamper(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Timestamper load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Timestamper(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Timestamper load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new Timestamper(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Timestamper load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new Timestamper(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static class TimestampEventResponse extends BaseEventResponse {
        public BigInteger id_hash;

        public BigInteger value_hash;
    }
}
