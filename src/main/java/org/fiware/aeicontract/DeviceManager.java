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
import org.web3j.abi.datatypes.Utf8String;
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
public class DeviceManager extends Contract {
    public static final String BINARY = "0x608060405234801561001057600080fd5b506117a5806100206000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80636231fb0b116100ad578063acbcb50711610071578063acbcb507146104ea578063b0bd9fda14610585578063b22d439d146105a2578063c40613df146105c5578063ee2357831461067157610121565b80636231fb0b146103865780638be10194146103a95780638e9075be146103f85780639de9662d146104aa578063aa554c9d146104c757610121565b80633da1f79a116100f45780633da1f79a146102015780634840c63b1461021e57806351b0e98714610247578063533293ab146102bd5780635a3f79d2146102e057610121565b806307f63700146101265780630bcb88e81461014b57806310ff8e311461017c5780632a08e601146101c9575b600080fd5b6101496004803603604081101561013c57600080fd5b508035906020013561069d565b005b6101686004803603602081101561016157600080fd5b50356107de565b604080519115158252519081900360200190f35b6101996004803603602081101561019257600080fd5b5035610839565b604080516001600160a01b0390951685526020850193909352838301919091526060830152519081900360800190f35b6101ef600480360360208110156101df57600080fd5b50356001600160a01b031661087a565b60408051918252519081900360200190f35b6101496004803603602081101561021757600080fd5b503561088c565b6101ef6004803603606081101561023457600080fd5b50803590602081013590604001356109d5565b61026d6004803603602081101561025d57600080fd5b50356001600160a01b0316610b2d565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156102a9578181015183820152602001610291565b505050509050019250505060405180910390f35b610149600480360360408110156102d357600080fd5b5080359060200135610bf7565b610149600480360360208110156102f657600080fd5b81019060208101813564010000000081111561031157600080fd5b82018360208201111561032357600080fd5b8035906020019184600183028401116401000000008311171561034557600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610d3a945050505050565b6101496004803603604081101561039c57600080fd5b5080359060200135610df5565b6103c6600480360360208110156103bf57600080fd5b5035610f36565b604080516001600160a01b03909516855260208501939093528383019190915215156060830152519081900360800190f35b6101686004803603606081101561040e57600080fd5b81359160208101359181019060608101604082013564010000000081111561043557600080fd5b82018360208201111561044757600080fd5b8035906020019184600183028401116401000000008311171561046957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610f7a945050505050565b61026d600480360360208110156104c057600080fd5b5035610fc3565b6101ef600480360360408110156104dd57600080fd5b508035906020013561108e565b6105106004803603602081101561050057600080fd5b50356001600160a01b03166111ec565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561054a578181015183820152602001610532565b50505050905090810190601f1680156105775780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101ef6004803603602081101561059b57600080fd5b503561128a565b610168600480360360408110156105b857600080fd5b508035906020013561129c565b610168600480360360608110156105db57600080fd5b813591908101906040810160208201356401000000008111156105fd57600080fd5b82018360208201111561060f57600080fd5b8035906020019184602083028401116401000000008311171561063157600080fd5b91908080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525092955050913592506112c7915050565b6101496004803603604081101561068757600080fd5b50803590602001356001600160a01b03166112fa565b81336001600160a01b0316600182815481106106b557fe5b60009182526020909120600490910201546001600160a01b031614610719576040805162461bcd60e51b815260206004820152601560248201527427b7363c903337b9103232bb34b1b29037bbb732b960591b604482015290519081900360640190fd5b600083815260046020526040902054839015610771576040805162461bcd60e51b8152602060048201526012602482015271135d5cdd081b9bdd081899481cda59db995960721b604482015290519081900360640190fd5b826001858154811061077f57fe5b906000526020600020906004020160020181905550676d6574616461746160c01b847f67ace838aca3988a026b61036d72b93a8316d05feecb6ee10316e8d59f0e687f856040518082815260200191505060405180910390a350505050565b6000600182815481106107ed57fe5b90600052602060002090600402016001015460001c6001600160a01b03166001838154811061081857fe5b60009182526020909120600490910201546001600160a01b03161492915050565b6001818154811061084657fe5b600091825260209091206004909102018054600182015460028301546003909301546001600160a01b039092169350919084565b60026020526000908152604090205481565b336001600160a01b0316600382815481106108a357fe5b60009182526020909120600490910201546001600160a01b0316146108f95760405162461bcd60e51b815260040180806020018281038252602181526020018061172c6021913960400191505060405180910390fd5b6003818154811061090657fe5b600091825260209091206003600490920201015460ff16156109595760405162461bcd60e51b815260040180806020018281038252602481526020018061174d6024913960400191505060405180910390fd5b60006003828154811061096857fe5b60009182526020808320600492830201600381018054600160ff199091168117909155810180548552929091526040808420805460001901905591549151909350909184917ff93d5095ac7696e643e1fa0aa35d622f4a13e11f4e199f30794679dcdcdb97379190a35050565b60006109df611636565b50604080516080810182523380825260208083018881528385018881526060808601898152600180548082018255600082815289517fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf66004840290810180546001600160a01b0319166001600160a01b039093169290921790915596517fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf788015594517fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf887015591517fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf9909501949094558583526002855291879020805490930190925585518a8152928301899052828601889052945193949384927f093aad13dfa930f4f2311a7f59be1c3674ccc072b729756c22447948a2c0520092908290030190a395945050505050565b60608060026000846001600160a01b03166001600160a01b0316815260200190815260200160002054604051908082528060200260200182016040528015610b7f578160200160208202803883390190505b5090506000805b600154811015610bee57846001600160a01b031660018281548110610ba757fe5b60009182526020909120600490910201546001600160a01b03161415610be65780838381518110610bd457fe5b60209081029190910101526001909101905b600101610b86565b50909392505050565b81336001600160a01b031660018281548110610c0f57fe5b60009182526020909120600490910201546001600160a01b031614610c73576040805162461bcd60e51b815260206004820152601560248201527427b7363c903337b9103232bb34b1b29037bbb732b960591b604482015290519081900360640190fd5b600083815260046020526040902054839015610ccb576040805162461bcd60e51b8152602060048201526012602482015271135d5cdd081b9bdd081899481cda59db995960721b604482015290519081900360640190fd5b8260018581548110610cd957fe5b9060005260206000209060040201600101819055506934b232b73a34b334b2b960b11b847f67ace838aca3988a026b61036d72b93a8316d05feecb6ee10316e8d59f0e687f856040518082815260200191505060405180910390a350505050565b336000908152602081815260409091208251610d589284019061165d565b50604080516020808252835181830152835133937f53d207b6cf416d44764c48a52a7e64ffa2793f67215d452a032a11e0dd34bd2c9386939092839283019185019080838360005b83811015610db8578181015183820152602001610da0565b50505050905090810190601f168015610de55780820380516001836020036101000a031916815260200191505b509250505060405180910390a250565b81336001600160a01b031660018281548110610e0d57fe5b60009182526020909120600490910201546001600160a01b031614610e71576040805162461bcd60e51b815260206004820152601560248201527427b7363c903337b9103232bb34b1b29037bbb732b960591b604482015290519081900360640190fd5b600083815260046020526040902054839015610ec9576040805162461bcd60e51b8152602060048201526012602482015271135d5cdd081b9bdd081899481cda59db995960721b604482015290519081900360640190fd5b8260018581548110610ed757fe5b906000526020600020906004020160030181905550676669726d7761726560c01b847f67ace838aca3988a026b61036d72b93a8316d05feecb6ee10316e8d59f0e687f856040518082815260200191505060405180910390a350505050565b60038181548110610f4357fe5b600091825260209091206004909102018054600182015460028301546003909301546001600160a01b039092169350919060ff1684565b600060018481548110610f8957fe5b90600052602060002090600402016001015460001c6001600160a01b0316610fb1848461149f565b6001600160a01b031614949350505050565b6060806004600084815260200190815260200160002054604051908082528060200260200182016040528015611003578160200160208202803883390190505b5090506000805b600354811015610bee57846003828154811061102257fe5b90600052602060002090600402016001015414801561106257506003818154811061104957fe5b600091825260209091206003600490920201015460ff16155b15611086578083838151811061107457fe5b60209081029190910101526001909101905b60010161100a565b60006110986116db565b5060408051608081018252338082526020808301878152838501878152600060608601818152600380546001808201835591845288517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b600480840291820180546001600160a01b0319166001600160a01b039094169390931790925596517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85c88015594517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85d87015591517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85e909501805460ff1916951515959095179094558a825291845286902080549092019091558451878152945193949093889285927f3739f348a11e3a029a385b4746ea6edba7f01ceec207010638e9d17862b78c40929081900390910190a49150505b92915050565b6000602081815291815260409081902080548251601f6002600019610100600186161502019093169290920491820185900485028101850190935280835290928391908301828280156112805780601f1061125557610100808354040283529160200191611280565b820191906000526020600020905b81548152906001019060200180831161126357829003601f168201915b5050505050905081565b60046020526000908152604090205481565b600081600184815481106112ac57fe5b90600052602060002090600402016003015414905092915050565b60006112f283600186815481106112da57fe5b9060005260206000209060040201600201548461158d565b949350505050565b81336001600160a01b03166001828154811061131257fe5b60009182526020909120600490910201546001600160a01b031614611376576040805162461bcd60e51b815260206004820152601560248201527427b7363c903337b9103232bb34b1b29037bbb732b960591b604482015290519081900360640190fd5b6000838152600460205260409020548390156113ce576040805162461bcd60e51b8152602060048201526012602482015271135d5cdd081b9bdd081899481cda59db995960721b604482015290519081900360640190fd5b6000600185815481106113dd57fe5b6000918252602090912060049091020154600180546001600160a01b03909216925085918790811061140b57fe5b6000918252602080832060049290920290910180546001600160a01b0319166001600160a01b03948516179055338252600281526040808320805460001901905587841680845292819020805460010190558051938516845290830191909152805187927f848155b8e733cfd6e7258639111d906437ddb051818f4061fc4c7cfbc575cb2e92908290030190a25050505050565b600081516041146114b2575060006111e6565b60208201516040830151606084015160001a7f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08211156114f857600093505050506111e6565b8060ff16601b1415801561151057508060ff16601c14155b1561152157600093505050506111e6565b6040805160008152602080820180845289905260ff8416828401526060820186905260808201859052915160019260a0808401939192601f1981019281900390910190855afa158015611578573d6000803e3d6000fd5b5050604051601f190151979650505050505050565b600081815b855181101561162b5760008682815181106115a957fe5b602002602001015190508083116115f05782816040516020018083815260200182815260200192505050604051602081830303815290604052805190602001209250611622565b808360405160200180838152602001828152602001925050506040516020818303038152906040528051906020012092505b50600101611592565b509092149392505050565b60408051608081018252600080825260208201819052918101829052606081019190915290565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061169e57805160ff19168380011785556116cb565b828001600101855582156116cb579182015b828111156116cb5782518255916020019190600101906116b0565b506116d792915061170e565b5090565b604051806080016040528060006001600160a01b0316815260200160008152602001600081526020016000151581525090565b61172891905b808211156116d75760008155600101611714565b9056fe4f6e6c7920666f722063726561746f72206f6620746865207369676e61747572655369676e6174757265206d7573746e2774206265207265766f6b656420616c7265616479a265627a7a7231582055755c3d7d40b51c35bd4a527d0651cf8442ada73dadbe140d0569a6831a566464736f6c63430005100032";

    public static final String FUNC_CREATEDEVICE = "createDevice";

    public static final String FUNC_DEVICESIGNATURECOUNT = "deviceSignatureCount";

    public static final String FUNC_DEVICES = "devices";

    public static final String FUNC_GETACTIVESIGNATURESFORDEVICE = "getActiveSignaturesForDevice";

    public static final String FUNC_GETDEVICESBYOWNER = "getDevicesByOwner";

    public static final String FUNC_ISDEVICEANENTITY = "isDeviceAnEntity";

    public static final String FUNC_ISVALIDETHMESSAGE = "isValidEthMessage";

    public static final String FUNC_ISVALIDFIRMWAREHASH = "isValidFirmwareHash";

    public static final String FUNC_ISVALIDMETADATAMEMBER = "isValidMetadataMember";

    public static final String FUNC_OWNERDEVICECOUNT = "ownerDeviceCount";

    public static final String FUNC_OWNERTOENTITY = "ownerToEntity";

    public static final String FUNC_REVOKESIGNATURE = "revokeSignature";

    public static final String FUNC_SIGNDEVICE = "signDevice";

    public static final String FUNC_SIGNATURES = "signatures";

    public static final String FUNC_TRANSFERDEVICE = "transferDevice";

    public static final String FUNC_UPDATEENTITYDATA = "updateEntityData";

    public static final String FUNC_UPDATEFIRMWAREHASH = "updateFirmwareHash";

    public static final String FUNC_UPDATEIDENTIFIER = "updateIdentifier";

    public static final String FUNC_UPDATEMETADATAHASH = "updateMetadataHash";

    public static final Event DEVICECREATED_EVENT = new Event("DeviceCreated", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Bytes32>() {}, new TypeReference<Bytes32>() {}, new TypeReference<Bytes32>() {}));
    ;

    public static final Event DEVICEPROPERTYUPDATED_EVENT = new Event("DevicePropertyUpdated", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Bytes32>(true) {}, new TypeReference<Bytes32>() {}));
    ;

    public static final Event DEVICESIGNED_EVENT = new Event("DeviceSigned", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Uint256>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}));
    ;

    public static final Event DEVICETRANSFERED_EVENT = new Event("DeviceTransfered", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Address>() {}, new TypeReference<Address>() {}));
    ;

    public static final Event ENTITYDATAUPDATED_EVENT = new Event("EntityDataUpdated", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    public static final Event SIGNATUREREVOKED_EVENT = new Event("SignatureRevoked", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Uint256>(true) {}));
    ;

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
        _addresses.put("1617272107202", "0x0927F8E09AAeaC70742e24A6EFb5315283eA6fFc");
        _addresses.put("1617285142538", "0xeE5db2d53b842367D9C9DDB70D423b714f7B7e50");
        _addresses.put("10", "0xc808294ef3cE3DCf2f847214c5C3670d427931f6");
    }

    @Deprecated
    protected DeviceManager(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected DeviceManager(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected DeviceManager(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected DeviceManager(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
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

    public List<DevicePropertyUpdatedEventResponse> getDevicePropertyUpdatedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(DEVICEPROPERTYUPDATED_EVENT, transactionReceipt);
        ArrayList<DevicePropertyUpdatedEventResponse> responses = new ArrayList<DevicePropertyUpdatedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            DevicePropertyUpdatedEventResponse typedResponse = new DevicePropertyUpdatedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.deviceId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.property = (byte[]) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.newValue = (byte[]) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<DevicePropertyUpdatedEventResponse> devicePropertyUpdatedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, DevicePropertyUpdatedEventResponse>() {
            @Override
            public DevicePropertyUpdatedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(DEVICEPROPERTYUPDATED_EVENT, log);
                DevicePropertyUpdatedEventResponse typedResponse = new DevicePropertyUpdatedEventResponse();
                typedResponse.log = log;
                typedResponse.deviceId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.property = (byte[]) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.newValue = (byte[]) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<DevicePropertyUpdatedEventResponse> devicePropertyUpdatedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(DEVICEPROPERTYUPDATED_EVENT));
        return devicePropertyUpdatedEventFlowable(filter);
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

    public List<DeviceTransferedEventResponse> getDeviceTransferedEvents(TransactionReceipt transactionReceipt) {
        List<EventValuesWithLog> valueList = extractEventParametersWithLog(DEVICETRANSFERED_EVENT, transactionReceipt);
        ArrayList<DeviceTransferedEventResponse> responses = new ArrayList<DeviceTransferedEventResponse>(valueList.size());
        for (EventValuesWithLog eventValues : valueList) {
            DeviceTransferedEventResponse typedResponse = new DeviceTransferedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.deviceId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.oldOwner = (String) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.newOwner = (String) eventValues.getNonIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<DeviceTransferedEventResponse> deviceTransferedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, DeviceTransferedEventResponse>() {
            @Override
            public DeviceTransferedEventResponse apply(Log log) {
                EventValuesWithLog eventValues = extractEventParametersWithLog(DEVICETRANSFERED_EVENT, log);
                DeviceTransferedEventResponse typedResponse = new DeviceTransferedEventResponse();
                typedResponse.log = log;
                typedResponse.deviceId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.oldOwner = (String) eventValues.getNonIndexedValues().get(0).getValue();
                typedResponse.newOwner = (String) eventValues.getNonIndexedValues().get(1).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<DeviceTransferedEventResponse> deviceTransferedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(DEVICETRANSFERED_EVENT));
        return deviceTransferedEventFlowable(filter);
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

    public RemoteFunctionCall<TransactionReceipt> createDevice(byte[] _identifier, byte[] _metadataHash, byte[] _firmwareHash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_CREATEDEVICE, 
                Arrays.<Type>asList(new Bytes32(_identifier),
                new Bytes32(_metadataHash),
                new Bytes32(_firmwareHash)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> deviceSignatureCount(BigInteger param0) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_DEVICESIGNATURECOUNT, 
                Arrays.<Type>asList(new Uint256(param0)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
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

    public RemoteFunctionCall<List> getActiveSignaturesForDevice(BigInteger _deviceId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_GETACTIVESIGNATURESFORDEVICE, 
                Arrays.<Type>asList(new Uint256(_deviceId)),
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

    public RemoteFunctionCall<Boolean> isValidEthMessage(BigInteger _deviceId, byte[] _messageHash, byte[] _signature) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ISVALIDETHMESSAGE, 
                Arrays.<Type>asList(new Uint256(_deviceId),
                new Bytes32(_messageHash),
                new org.web3j.abi.datatypes.DynamicBytes(_signature)), 
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

    public RemoteFunctionCall<BigInteger> ownerDeviceCount(String param0) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_OWNERDEVICECOUNT, 
                Arrays.<Type>asList(new Address(param0)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> ownerToEntity(String param0) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_OWNERTOENTITY, 
                Arrays.<Type>asList(new Address(param0)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> revokeSignature(BigInteger _signatureId) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_REVOKESIGNATURE, 
                Arrays.<Type>asList(new Uint256(_signatureId)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> signDevice(BigInteger _deviceId, BigInteger _expiryTime) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_SIGNDEVICE, 
                Arrays.<Type>asList(new Uint256(_deviceId),
                new Uint256(_expiryTime)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
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

    public RemoteFunctionCall<TransactionReceipt> transferDevice(BigInteger _deviceId, String _to) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_TRANSFERDEVICE, 
                Arrays.<Type>asList(new Uint256(_deviceId),
                new Address(_to)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> updateEntityData(String _data) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_UPDATEENTITYDATA, 
                Arrays.<Type>asList(new Utf8String(_data)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> updateFirmwareHash(BigInteger _deviceId, byte[] _newFirmwareHash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_UPDATEFIRMWAREHASH, 
                Arrays.<Type>asList(new Uint256(_deviceId),
                new Bytes32(_newFirmwareHash)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> updateIdentifier(BigInteger _deviceId, byte[] _newIdentifier) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_UPDATEIDENTIFIER, 
                Arrays.<Type>asList(new Uint256(_deviceId),
                new Bytes32(_newIdentifier)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> updateMetadataHash(BigInteger _deviceId, byte[] _newMetadataHash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_UPDATEMETADATAHASH, 
                Arrays.<Type>asList(new Uint256(_deviceId),
                new Bytes32(_newMetadataHash)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static DeviceManager load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new DeviceManager(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static DeviceManager load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new DeviceManager(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static DeviceManager load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new DeviceManager(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static DeviceManager load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new DeviceManager(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<DeviceManager> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(DeviceManager.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<DeviceManager> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(DeviceManager.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<DeviceManager> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(DeviceManager.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<DeviceManager> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(DeviceManager.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
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

    public static class DevicePropertyUpdatedEventResponse extends BaseEventResponse {
        public BigInteger deviceId;

        public byte[] property;

        public byte[] newValue;
    }

    public static class DeviceSignedEventResponse extends BaseEventResponse {
        public BigInteger signatureId;

        public BigInteger deviceId;

        public String signer;

        public BigInteger expiryTime;
    }

    public static class DeviceTransferedEventResponse extends BaseEventResponse {
        public BigInteger deviceId;

        public String oldOwner;

        public String newOwner;
    }

    public static class EntityDataUpdatedEventResponse extends BaseEventResponse {
        public String owner;

        public String newData;
    }

    public static class SignatureRevokedEventResponse extends BaseEventResponse {
        public BigInteger signatureId;

        public BigInteger deviceId;
    }
}
