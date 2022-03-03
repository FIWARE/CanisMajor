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
import org.web3j.abi.datatypes.DynamicBytes;
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
import org.web3j.tuples.generated.Tuple2;
import org.web3j.tuples.generated.Tuple3;
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
public class PublicResolver extends Contract {
    public static final String BINARY = "Bin file was not provided";

    public static final String FUNC_ALADIDPUBLICENTITY = "AlaDIDPublicEntity";

    public static final String FUNC_ALATSP = "AlaTSP";

    public static final String FUNC_ALATSPNUMBERSERVICES = "AlaTSPNumberServices";

    public static final String FUNC_ALATSPSERVICE = "AlaTSPService";

    public static final String FUNC_ADDALATSPSERVICE = "addAlaTSPService";

    public static final String FUNC_ADDPARTICIPANT = "addParticipant";

    public static final String FUNC_ADDPUBLICKEY = "addPublicKey";

    public static final String FUNC_ADDRESSFROMDID = "addressFromDID";

    public static final String FUNC_AUTHORISATIONS = "authorisations";

    public static final String FUNC_CONFIRMCREDENTIAL = "confirmCredential";

    public static final String FUNC_CONTENTHASH = "contenthash";

    public static final String FUNC_CREDENTIAL = "credential";

    public static final String FUNC_CREDENTIALPARTICIPANT = "credentialParticipant";

    public static final String FUNC_DELETEPUBLICKEY = "deletePublicKey";

    public static final String FUNC_HASH = "hash";

    public static final String FUNC_NAME = "name";

    public static final String FUNC_NODEFROMDID = "nodeFromDID";

    public static final String FUNC_PUBLICKEY = "publicKey";

    public static final String FUNC_PUBLICKEYATINDEX = "publicKeyAtIndex";

    public static final String FUNC_REVOKEPUBLICKEY = "revokePublicKey";

    public static final String FUNC_SETALADIDDOCUMENT = "setAlaDIDDocument";

    public static final String FUNC_SETALADIDPUBLICENTITY = "setAlaDIDPublicEntity";

    public static final String FUNC_SETALATSP = "setAlaTSP";

    public static final String FUNC_SETAUTHORISATION = "setAuthorisation";

    public static final String FUNC_SETCONTENTHASH = "setContenthash";

    public static final String FUNC_SETCREDENTIAL = "setCredential";

    public static final String FUNC_SETNAME = "setName";

    public static final String FUNC_SETTEXT = "setText";

    public static final String FUNC_SUPPORTSINTERFACE = "supportsInterface";

    public static final String FUNC_TEXT = "text";

    public static final Event ALADIDDOCUMENTCHANGED_EVENT = new Event("AlaDIDDocumentChanged", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    public static final Event ALADIDPUBKEYADDED_EVENT = new Event("AlaDIDPubkeyAdded", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Utf8String>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    public static final Event ALADIDPUBKEYDELETED_EVENT = new Event("AlaDIDPubkeyDeleted", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Utf8String>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    public static final Event ALADIDPUBKEYREVOKED_EVENT = new Event("AlaDIDPubkeyRevoked", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Utf8String>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    public static final Event AUTHORISATIONCHANGED_EVENT = new Event("AuthorisationChanged", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Bool>() {}));
    ;

    public static final Event CONTENTHASHCHANGED_EVENT = new Event("ContenthashChanged", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<DynamicBytes>() {}));
    ;

    public static final Event NAMECHANGED_EVENT = new Event("NameChanged", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    public static final Event TEXTCHANGED_EVENT = new Event("TextChanged", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>(true) {}, new TypeReference<Utf8String>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    @Deprecated
    protected PublicResolver(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected PublicResolver(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected PublicResolver(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected PublicResolver(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
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

    public List<AuthorisationChangedEventResponse> getAuthorisationChangedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(AUTHORISATIONCHANGED_EVENT, transactionReceipt);
        ArrayList<AuthorisationChangedEventResponse> responses = new ArrayList<AuthorisationChangedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            AuthorisationChangedEventResponse typedResponse = new AuthorisationChangedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.owner = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.target = (String) eventValues.getIndexedValues().get(2).getValue();
            typedResponse.isAuthorised = (Boolean) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<AuthorisationChangedEventResponse> authorisationChangedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, AuthorisationChangedEventResponse>() {
            @Override
            public AuthorisationChangedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(AUTHORISATIONCHANGED_EVENT, log);
                AuthorisationChangedEventResponse typedResponse = new AuthorisationChangedEventResponse();
                typedResponse.log = log;
                typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.owner = (String) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.target = (String) eventValues.getIndexedValues().get(2).getValue();
                typedResponse.isAuthorised = (Boolean) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<AuthorisationChangedEventResponse> authorisationChangedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(AUTHORISATIONCHANGED_EVENT));
        return authorisationChangedEventFlowable(filter);
    }

    public List<ContenthashChangedEventResponse> getContenthashChangedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(CONTENTHASHCHANGED_EVENT, transactionReceipt);
        ArrayList<ContenthashChangedEventResponse> responses = new ArrayList<ContenthashChangedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            ContenthashChangedEventResponse typedResponse = new ContenthashChangedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.hash = (byte[]) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<ContenthashChangedEventResponse> contenthashChangedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, ContenthashChangedEventResponse>() {
            @Override
            public ContenthashChangedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(CONTENTHASHCHANGED_EVENT, log);
                ContenthashChangedEventResponse typedResponse = new ContenthashChangedEventResponse();
                typedResponse.log = log;
                typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.hash = (byte[]) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<ContenthashChangedEventResponse> contenthashChangedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(CONTENTHASHCHANGED_EVENT));
        return contenthashChangedEventFlowable(filter);
    }

    public List<NameChangedEventResponse> getNameChangedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(NAMECHANGED_EVENT, transactionReceipt);
        ArrayList<NameChangedEventResponse> responses = new ArrayList<NameChangedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            NameChangedEventResponse typedResponse = new NameChangedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.name = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<NameChangedEventResponse> nameChangedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, NameChangedEventResponse>() {
            @Override
            public NameChangedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(NAMECHANGED_EVENT, log);
                NameChangedEventResponse typedResponse = new NameChangedEventResponse();
                typedResponse.log = log;
                typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.name = (String) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<NameChangedEventResponse> nameChangedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(NAMECHANGED_EVENT));
        return nameChangedEventFlowable(filter);
    }

    public List<TextChangedEventResponse> getTextChangedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(TEXTCHANGED_EVENT, transactionReceipt);
        ArrayList<TextChangedEventResponse> responses = new ArrayList<TextChangedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            TextChangedEventResponse typedResponse = new TextChangedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.indexedKey = (byte[]) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.key = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<TextChangedEventResponse> textChangedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, TextChangedEventResponse>() {
            @Override
            public TextChangedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(TEXTCHANGED_EVENT, log);
                TextChangedEventResponse typedResponse = new TextChangedEventResponse();
                typedResponse.log = log;
                typedResponse.node = (byte[]) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.indexedKey = (byte[]) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.key = (String) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<TextChangedEventResponse> textChangedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(TEXTCHANGED_EVENT));
        return textChangedEventFlowable(filter);
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

    public RemoteFunctionCall<Tuple3<String, String, Boolean>> AlaTSP(byte[] node) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ALATSP, 
                Arrays.<Type>asList(new Bytes32(node)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Bool>() {}));
        return new RemoteFunctionCall<Tuple3<String, String, Boolean>>(function,
                new Callable<Tuple3<String, String, Boolean>>() {
                    @Override
                    public Tuple3<String, String, Boolean> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple3<String, String, Boolean>(
                                (String) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (Boolean) results.get(2).getValue());
                    }
                });
    }

    public RemoteFunctionCall<BigInteger> AlaTSPNumberServices(byte[] node) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ALATSPNUMBERSERVICES, 
                Arrays.<Type>asList(new Bytes32(node)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Tuple4<String, String, byte[], Boolean>> AlaTSPService(byte[] node, BigInteger index) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ALATSPSERVICE, 
                Arrays.<Type>asList(new Bytes32(node),
                new Uint256(index)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<DynamicBytes>() {}, new TypeReference<Bool>() {}));
        return new RemoteFunctionCall<Tuple4<String, String, byte[], Boolean>>(function,
                new Callable<Tuple4<String, String, byte[], Boolean>>() {
                    @Override
                    public Tuple4<String, String, byte[], Boolean> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<String, String, byte[], Boolean>(
                                (String) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (byte[]) results.get(2).getValue(), 
                                (Boolean) results.get(3).getValue());
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> addAlaTSPService(byte[] node, byte[] label, String X509SKI, String serviceName, byte[] X509Certificate, Boolean active) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_ADDALATSPSERVICE, 
                Arrays.<Type>asList(new Bytes32(node),
                new Bytes32(label),
                new Utf8String(X509SKI),
                new Utf8String(serviceName),
                new DynamicBytes(X509Certificate),
                new Bool(active)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> addParticipant(byte[] node, String key, byte[] partDIDHash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_ADDPARTICIPANT, 
                Arrays.<Type>asList(new Bytes32(node),
                new Utf8String(key),
                new Bytes32(partDIDHash)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
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

    public RemoteFunctionCall<String> addressFromDID(byte[] _DIDHash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ADDRESSFROMDID, 
                Arrays.<Type>asList(new Bytes32(_DIDHash)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<Boolean> authorisations(byte[] param0, String param1, String param2) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_AUTHORISATIONS, 
                Arrays.<Type>asList(new Bytes32(param0),
                new Address(160, param1),
                new Address(160, param2)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<TransactionReceipt> confirmCredential(byte[] node, String key, byte[] partDIDHash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_CONFIRMCREDENTIAL, 
                Arrays.<Type>asList(new Bytes32(node),
                new Utf8String(key),
                new Bytes32(partDIDHash)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<byte[]> contenthash(byte[] node) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_CONTENTHASH, 
                Arrays.<Type>asList(new Bytes32(node)),
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicBytes>() {}));
        return executeRemoteCallSingleValueReturn(function, byte[].class);
    }

    public RemoteFunctionCall<Tuple2<byte[], BigInteger>> credential(byte[] node, String key) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_CREDENTIAL, 
                Arrays.<Type>asList(new Bytes32(node),
                new Utf8String(key)),
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicBytes>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple2<byte[], BigInteger>>(function,
                new Callable<Tuple2<byte[], BigInteger>>() {
                    @Override
                    public Tuple2<byte[], BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple2<byte[], BigInteger>(
                                (byte[]) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue());
                    }
                });
    }

    public RemoteFunctionCall<Tuple2<byte[], Boolean>> credentialParticipant(byte[] node, String key, BigInteger index) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_CREDENTIALPARTICIPANT, 
                Arrays.<Type>asList(new Bytes32(node),
                new Utf8String(key),
                new Uint256(index)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>() {}, new TypeReference<Bool>() {}));
        return new RemoteFunctionCall<Tuple2<byte[], Boolean>>(function,
                new Callable<Tuple2<byte[], Boolean>>() {
                    @Override
                    public Tuple2<byte[], Boolean> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple2<byte[], Boolean>(
                                (byte[]) results.get(0).getValue(), 
                                (Boolean) results.get(1).getValue());
                    }
                });
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

    public RemoteFunctionCall<String> name(byte[] node) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_NAME, 
                Arrays.<Type>asList(new Bytes32(node)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<byte[]> nodeFromDID(byte[] _DIDHash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_NODEFROMDID, 
                Arrays.<Type>asList(new Bytes32(_DIDHash)),
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

    public RemoteFunctionCall<TransactionReceipt> setAlaTSP(byte[] node, byte[] label, String URI, String org, Boolean active) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SETALATSP, 
                Arrays.<Type>asList(new Bytes32(node),
                new Bytes32(label),
                new Utf8String(URI),
                new Utf8String(org),
                new Bool(active)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> setAuthorisation(byte[] node, String target, Boolean isAuthorised) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SETAUTHORISATION, 
                Arrays.<Type>asList(new Bytes32(node),
                new Address(160, target),
                new Bool(isAuthorised)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> setContenthash(byte[] node, byte[] hash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SETCONTENTHASH, 
                Arrays.<Type>asList(new Bytes32(node),
                new DynamicBytes(hash)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> setCredential(byte[] node, String key, byte[] credentialHash, byte[] part1DIDhash, byte[] part2DIDhash, byte[] part3DIDhash, byte[] part4DIDhash, byte[] part5DIDhash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SETCREDENTIAL, 
                Arrays.<Type>asList(new Bytes32(node),
                new Utf8String(key),
                new DynamicBytes(credentialHash),
                new Bytes32(part1DIDhash),
                new Bytes32(part2DIDhash),
                new Bytes32(part3DIDhash),
                new Bytes32(part4DIDhash),
                new Bytes32(part5DIDhash)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> setName(byte[] node, String name) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SETNAME, 
                Arrays.<Type>asList(new Bytes32(node),
                new Utf8String(name)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> setText(byte[] node, String key, String value) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SETTEXT, 
                Arrays.<Type>asList(new Bytes32(node),
                new Utf8String(key),
                new Utf8String(value)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Boolean> supportsInterface(byte[] interfaceID) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_SUPPORTSINTERFACE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes4(interfaceID)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<String> text(byte[] node, String key) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_TEXT, 
                Arrays.<Type>asList(new Bytes32(node),
                new Utf8String(key)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    @Deprecated
    public static PublicResolver load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new PublicResolver(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static PublicResolver load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new PublicResolver(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static PublicResolver load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new PublicResolver(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static PublicResolver load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new PublicResolver(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static class AlaDIDDocumentChangedEventResponse extends BaseEventResponse {
        public byte[] node;

        public String document;
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

    public static class AuthorisationChangedEventResponse extends BaseEventResponse {
        public byte[] node;

        public String owner;

        public String target;

        public Boolean isAuthorised;
    }

    public static class ContenthashChangedEventResponse extends BaseEventResponse {
        public byte[] node;

        public byte[] hash;
    }

    public static class NameChangedEventResponse extends BaseEventResponse {
        public byte[] node;

        public String name;
    }

    public static class TextChangedEventResponse extends BaseEventResponse {
        public byte[] node;

        public byte[] indexedKey;

        public String key;
    }
}
