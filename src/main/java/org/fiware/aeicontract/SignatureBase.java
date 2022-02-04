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
public class SignatureBase extends Contract {
    public static final String BINARY = "0x608060405234801561001057600080fd5b506104b2806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80633da1f79a146100515780638be1019414610070578063aa554c9d146100bf578063b0bd9fda146100f4575b600080fd5b61006e6004803603602081101561006757600080fd5b5035610111565b005b61008d6004803603602081101561008657600080fd5b5035610257565b604080516001600160a01b03909516855260208501939093528383019190915215156060830152519081900360800190f35b6100e2600480360360408110156100d557600080fd5b508035906020013561029b565b60408051918252519081900360200190f35b6100e26004803603602081101561010a57600080fd5b50356103f3565b336001600160a01b03166000828154811061012857fe5b60009182526020909120600490910201546001600160a01b03161461017e5760405162461bcd60e51b81526004018080602001828103825260218152602001806104396021913960400191505060405180910390fd5b6000818154811061018b57fe5b600091825260209091206003600490920201015460ff16156101de5760405162461bcd60e51b815260040180806020018281038252602481526020018061045a6024913960400191505060405180910390fd5b60008082815481106101ec57fe5b600091825260208083206003600490930201918201805460ff1916600190811790915580830180548552915260408084208054600019019055905490519193509184917ff93d5095ac7696e643e1fa0aa35d622f4a13e11f4e199f30794679dcdcdb97379190a35050565b6000818154811061026457fe5b600091825260209091206004909102018054600182015460028301546003909301546001600160a01b039092169350919060ff1684565b60006102a5610405565b506040805160808101825233808252602080830187815283850187815260006060860181815281546001808201845583805288517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5636004840290810180546001600160a01b0319166001600160a01b039093169290921790915595517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56487015593517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56586015590517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e566909401805460ff191694151594909417909355898152818452869020805490910190558451878152945193949093889285927f3739f348a11e3a029a385b4746ea6edba7f01ceec207010638e9d17862b78c40929081900390910190a4949350505050565b60016020526000908152604090205481565b604051806080016040528060006001600160a01b031681526020016000815260200160008152602001600015158152509056fe4f6e6c7920666f722063726561746f72206f6620746865207369676e61747572655369676e6174757265206d7573746e2774206265207265766f6b656420616c7265616479a265627a7a72315820a48464b467d9d9ab9243525138961c9a87b977a38a24a116c78ca7a08e754d2364736f6c63430005100032";

    public static final String FUNC_DEVICESIGNATURECOUNT = "deviceSignatureCount";

    public static final String FUNC_SIGNATURES = "signatures";

    public static final String FUNC_SIGNDEVICE = "signDevice";

    public static final String FUNC_REVOKESIGNATURE = "revokeSignature";

    public static final Event DEVICESIGNED_EVENT = new Event("DeviceSigned", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Uint256>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}));
    ;

    public static final Event SIGNATUREREVOKED_EVENT = new Event("SignatureRevoked", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Uint256>(true) {}));
    ;

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
    }

    @Deprecated
    protected SignatureBase(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected SignatureBase(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected SignatureBase(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected SignatureBase(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public List<DeviceSignedEventResponse> getDeviceSignedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(DEVICESIGNED_EVENT, transactionReceipt);
        ArrayList<DeviceSignedEventResponse> responses = new ArrayList<DeviceSignedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            DeviceSignedEventResponse typedResponse = new DeviceSignedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.signatureId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.deviceId = (BigInteger) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.signer = (String) eventValues.getIndexedValues().get(2).getValue();
            typedResponse.expiryTime = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<DeviceSignedEventResponse> deviceSignedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, DeviceSignedEventResponse>() {
            @Override
            public DeviceSignedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(DEVICESIGNED_EVENT, log);
                DeviceSignedEventResponse typedResponse = new DeviceSignedEventResponse();
                typedResponse.log = log;
                typedResponse.signatureId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.deviceId = (BigInteger) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.signer = (String) eventValues.getIndexedValues().get(2).getValue();
                typedResponse.expiryTime = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<DeviceSignedEventResponse> deviceSignedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(DEVICESIGNED_EVENT));
        return deviceSignedEventFlowable(filter);
    }

    public List<SignatureRevokedEventResponse> getSignatureRevokedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(SIGNATUREREVOKED_EVENT, transactionReceipt);
        ArrayList<SignatureRevokedEventResponse> responses = new ArrayList<SignatureRevokedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            SignatureRevokedEventResponse typedResponse = new SignatureRevokedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.signatureId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.deviceId = (BigInteger) eventValues.getIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<SignatureRevokedEventResponse> signatureRevokedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, SignatureRevokedEventResponse>() {
            @Override
            public SignatureRevokedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(SIGNATUREREVOKED_EVENT, log);
                SignatureRevokedEventResponse typedResponse = new SignatureRevokedEventResponse();
                typedResponse.log = log;
                typedResponse.signatureId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.deviceId = (BigInteger) eventValues.getIndexedValues().get(1).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<SignatureRevokedEventResponse> signatureRevokedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(SIGNATUREREVOKED_EVENT));
        return signatureRevokedEventFlowable(filter);
    }

    public RemoteFunctionCall<BigInteger> deviceSignatureCount(BigInteger param0) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_DEVICESIGNATURECOUNT, 
                Arrays.<Type>asList(new Uint256(param0)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Tuple4<String, BigInteger, BigInteger, Boolean>> signatures(BigInteger param0) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_SIGNATURES, 
                Arrays.<Type>asList(new Uint256(param0)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Bool>() {}));
        return new RemoteFunctionCall<Tuple4<String, BigInteger, BigInteger, Boolean>>(function,
                new Callable<Tuple4<String, BigInteger, BigInteger, Boolean>>() {
                    @Override
                    public Tuple4<String, BigInteger, BigInteger, Boolean> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<String, BigInteger, BigInteger, Boolean>(
                                (String) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (Boolean) results.get(3).getValue());
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> signDevice(BigInteger _deviceId, BigInteger _expiryTime) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SIGNDEVICE, 
                Arrays.<Type>asList(new Uint256(_deviceId),
                new Uint256(_expiryTime)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> revokeSignature(BigInteger _signatureId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_REVOKESIGNATURE, 
                Arrays.<Type>asList(new Uint256(_signatureId)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static SignatureBase load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new SignatureBase(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static SignatureBase load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new SignatureBase(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static SignatureBase load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new SignatureBase(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static SignatureBase load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new SignatureBase(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<SignatureBase> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(SignatureBase.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<SignatureBase> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(SignatureBase.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<SignatureBase> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(SignatureBase.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<SignatureBase> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(SignatureBase.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    protected String getStaticDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static String getPreviouslyDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static class DeviceSignedEventResponse extends BaseEventResponse {
        public BigInteger signatureId;

        public BigInteger deviceId;

        public String signer;

        public BigInteger expiryTime;
    }

    public static class SignatureRevokedEventResponse extends BaseEventResponse {
        public BigInteger signatureId;

        public BigInteger deviceId;
    }
}
