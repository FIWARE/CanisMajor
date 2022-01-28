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
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
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
public class EntityBase extends Contract {
    public static final String BINARY = "0x608060405234801561001057600080fd5b506103a7806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80635a3f79d21461003b578063acbcb507146100e3575b600080fd5b6100e16004803603602081101561005157600080fd5b81019060208101813564010000000081111561006c57600080fd5b82018360208201111561007e57600080fd5b803590602001918460018302840111640100000000831117156100a057600080fd5b91908080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525092955061017e945050505050565b005b610109600480360360208110156100f957600080fd5b50356001600160a01b0316610239565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561014357818101518382015260200161012b565b50505050905090810190601f1680156101705780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b33600090815260208181526040909120825161019c928401906102d7565b50604080516020808252835181830152835133937f53d207b6cf416d44764c48a52a7e64ffa2793f67215d452a032a11e0dd34bd2c9386939092839283019185019080838360005b838110156101fc5781810151838201526020016101e4565b50505050905090810190601f1680156102295780820380516001836020036101000a031916815260200191505b509250505060405180910390a250565b6000602081815291815260409081902080548251601f6002600019610100600186161502019093169290920491820185900485028101850190935280835290928391908301828280156102cd5780601f106102a2576101008083540402835291602001916102cd565b820191906000526020600020905b8154815290600101906020018083116102b057829003601f168201915b5050505050905081565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061031857805160ff1916838001178555610345565b82800160010185558215610345579182015b8281111561034557825182559160200191906001019061032a565b50610351929150610355565b5090565b61036f91905b80821115610351576000815560010161035b565b9056fea265627a7a72315820b81b25d0f20c92e59431d7d45a7b24ae92807812f78973f7454b1d25724f486264736f6c63430005100032";

    public static final String FUNC_OWNERTOENTITY = "ownerToEntity";

    public static final String FUNC_UPDATEENTITYDATA = "updateEntityData";

    public static final Event ENTITYDATAUPDATED_EVENT = new Event("EntityDataUpdated", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
    }

    @Deprecated
    protected EntityBase(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected EntityBase(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected EntityBase(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected EntityBase(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public List<EntityDataUpdatedEventResponse> getEntityDataUpdatedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(ENTITYDATAUPDATED_EVENT, transactionReceipt);
        ArrayList<EntityDataUpdatedEventResponse> responses = new ArrayList<EntityDataUpdatedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            EntityDataUpdatedEventResponse typedResponse = new EntityDataUpdatedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.newData = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<EntityDataUpdatedEventResponse> entityDataUpdatedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, EntityDataUpdatedEventResponse>() {
            @Override
            public EntityDataUpdatedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(ENTITYDATAUPDATED_EVENT, log);
                EntityDataUpdatedEventResponse typedResponse = new EntityDataUpdatedEventResponse();
                typedResponse.log = log;
                typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.newData = (String) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<EntityDataUpdatedEventResponse> entityDataUpdatedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(ENTITYDATAUPDATED_EVENT));
        return entityDataUpdatedEventFlowable(filter);
    }

    public RemoteFunctionCall<String> ownerToEntity(String param0) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_OWNERTOENTITY, 
                Arrays.<Type>asList(new Address(param0)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> updateEntityData(String _data) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_UPDATEENTITYDATA, 
                Arrays.<Type>asList(new Utf8String(_data)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static EntityBase load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new EntityBase(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static EntityBase load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new EntityBase(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static EntityBase load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new EntityBase(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static EntityBase load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new EntityBase(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<EntityBase> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(EntityBase.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<EntityBase> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(EntityBase.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<EntityBase> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(EntityBase.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<EntityBase> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(EntityBase.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    protected String getStaticDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static String getPreviouslyDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static class EntityDataUpdatedEventResponse extends BaseEventResponse {
        public String owner;

        public String newData;
    }
}
