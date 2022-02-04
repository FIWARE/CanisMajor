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
public class DeviceUpdatable extends Contract {
    public static final String BINARY = "0x608060405234801561001057600080fd5b50611457806100206000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80636231fb0b116100a2578063aa554c9d11610071578063aa554c9d1461040b578063b0bd9fda1461042e578063b22d439d1461044b578063c40613df1461046e578063ee2357831461051a5761010b565b80636231fb0b146102ca5780638be10194146102ed5780638e9075be1461033c5780639de9662d146103ee5761010b565b80633da1f79a116100de5780633da1f79a146101eb5780634840c63b1461020857806351b0e98714610231578063533293ab146102a75761010b565b806307f63700146101105780630bcb88e81461013557806310ff8e31146101665780632a08e601146101b3575b600080fd5b6101336004803603604081101561012657600080fd5b5080359060200135610546565b005b6101526004803603602081101561014b57600080fd5b5035610687565b604080519115158252519081900360200190f35b6101836004803603602081101561017c57600080fd5b50356106e1565b604080516001600160a01b0390951685526020850193909352838301919091526060830152519081900360800190f35b6101d9600480360360208110156101c957600080fd5b50356001600160a01b0316610722565b60408051918252519081900360200190f35b6101336004803603602081101561020157600080fd5b5035610734565b6101d96004803603606081101561021e57600080fd5b508035906020810135906040013561087d565b6102576004803603602081101561024757600080fd5b50356001600160a01b03166109d5565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561029357818101518382015260200161027b565b505050509050019250505060405180910390f35b610133600480360360408110156102bd57600080fd5b5080359060200135610a9f565b610133600480360360408110156102e057600080fd5b5080359060200135610be2565b61030a6004803603602081101561030357600080fd5b5035610d23565b604080516001600160a01b03909516855260208501939093528383019190915215156060830152519081900360800190f35b6101526004803603606081101561035257600080fd5b81359160208101359181019060608101604082013564010000000081111561037957600080fd5b82018360208201111561038b57600080fd5b803590602001918460018302840111640100000000831117156103ad57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610d67945050505050565b6102576004803603602081101561040457600080fd5b5035610daf565b6101d96004803603604081101561042157600080fd5b5080359060200135610e7a565b6101d96004803603602081101561044457600080fd5b5035610fd8565b6101526004803603604081101561046157600080fd5b5080359060200135610fea565b6101526004803603606081101561048457600080fd5b813591908101906040810160208201356401000000008111156104a657600080fd5b8201836020820111156104b857600080fd5b803590602001918460208302840111640100000000831117156104da57600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295505091359250611015915050565b6101336004803603604081101561053057600080fd5b50803590602001356001600160a01b0316611048565b81336001600160a01b03166000828154811061055e57fe5b60009182526020909120600490910201546001600160a01b0316146105c2576040805162461bcd60e51b815260206004820152601560248201527427b7363c903337b9103232bb34b1b29037bbb732b960591b604482015290519081900360640190fd5b60008381526003602052604090205483901561061a576040805162461bcd60e51b8152602060048201526012602482015271135d5cdd081b9bdd081899481cda59db995960721b604482015290519081900360640190fd5b826000858154811061062857fe5b906000526020600020906004020160020181905550676d6574616461746160c01b847f67ace838aca3988a026b61036d72b93a8316d05feecb6ee10316e8d59f0e687f856040518082815260200191505060405180910390a350505050565b600080828154811061069557fe5b90600052602060002090600402016001015460001c6001600160a01b0316600083815481106106c057fe5b60009182526020909120600490910201546001600160a01b03161492915050565b600081815481106106ee57fe5b600091825260209091206004909102018054600182015460028301546003909301546001600160a01b039092169350919084565b60016020526000908152604090205481565b336001600160a01b03166002828154811061074b57fe5b60009182526020909120600490910201546001600160a01b0316146107a15760405162461bcd60e51b81526004018080602001828103825260218152602001806113de6021913960400191505060405180910390fd5b600281815481106107ae57fe5b600091825260209091206003600490920201015460ff16156108015760405162461bcd60e51b81526004018080602001828103825260248152602001806113ff6024913960400191505060405180910390fd5b60006002828154811061081057fe5b600091825260208083206003600490930201828101805460ff19166001908117909155810180548552929091526040808420805460001901905591549151909350909184917ff93d5095ac7696e643e1fa0aa35d622f4a13e11f4e199f30794679dcdcdb97379190a35050565b6000610887611383565b50604080516080810182523380825260208083018881528385018881526060808601898152600080546001808201835582805289517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5636004840290810180546001600160a01b0319166001600160a01b039093169290921790915596517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56488015594517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e56587015591517f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5669095019490945585845282855292879020805490920190915585518a815292830189905282860188905294519394909384927f093aad13dfa930f4f2311a7f59be1c3674ccc072b729756c22447948a2c0520092908290030190a395945050505050565b60608060016000846001600160a01b03166001600160a01b0316815260200190815260200160002054604051908082528060200260200182016040528015610a27578160200160208202803883390190505b5090506000805b600054811015610a9657846001600160a01b031660008281548110610a4f57fe5b60009182526020909120600490910201546001600160a01b03161415610a8e5780838381518110610a7c57fe5b60209081029190910101526001909101905b600101610a2e565b50909392505050565b81336001600160a01b031660008281548110610ab757fe5b60009182526020909120600490910201546001600160a01b031614610b1b576040805162461bcd60e51b815260206004820152601560248201527427b7363c903337b9103232bb34b1b29037bbb732b960591b604482015290519081900360640190fd5b600083815260036020526040902054839015610b73576040805162461bcd60e51b8152602060048201526012602482015271135d5cdd081b9bdd081899481cda59db995960721b604482015290519081900360640190fd5b8260008581548110610b8157fe5b9060005260206000209060040201600101819055506934b232b73a34b334b2b960b11b847f67ace838aca3988a026b61036d72b93a8316d05feecb6ee10316e8d59f0e687f856040518082815260200191505060405180910390a350505050565b81336001600160a01b031660008281548110610bfa57fe5b60009182526020909120600490910201546001600160a01b031614610c5e576040805162461bcd60e51b815260206004820152601560248201527427b7363c903337b9103232bb34b1b29037bbb732b960591b604482015290519081900360640190fd5b600083815260036020526040902054839015610cb6576040805162461bcd60e51b8152602060048201526012602482015271135d5cdd081b9bdd081899481cda59db995960721b604482015290519081900360640190fd5b8260008581548110610cc457fe5b906000526020600020906004020160030181905550676669726d7761726560c01b847f67ace838aca3988a026b61036d72b93a8316d05feecb6ee10316e8d59f0e687f856040518082815260200191505060405180910390a350505050565b60028181548110610d3057fe5b600091825260209091206004909102018054600182015460028301546003909301546001600160a01b039092169350919060ff1684565b6000808481548110610d7557fe5b90600052602060002090600402016001015460001c6001600160a01b0316610d9d84846111ec565b6001600160a01b031614949350505050565b6060806003600084815260200190815260200160002054604051908082528060200260200182016040528015610def578160200160208202803883390190505b5090506000805b600254811015610a96578460028281548110610e0e57fe5b906000526020600020906004020160010154148015610e4e575060028181548110610e3557fe5b600091825260209091206003600490920201015460ff16155b15610e725780838381518110610e6057fe5b60209081029190910101526001909101905b600101610df6565b6000610e846113aa565b5060408051608081018252338082526020808301878152838501878152600060608601818152600280546001808201835591845288517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace6004830290810180546001600160a01b0319166001600160a01b039093169290921790915595517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acf87015593517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad086015590517f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ad1909401805460ff1916941515949094179093558981526003845286902080549092019091558451878152945193949093889285927f3739f348a11e3a029a385b4746ea6edba7f01ceec207010638e9d17862b78c40929081900390910190a49150505b92915050565b60036020526000908152604090205481565b60008160008481548110610ffa57fe5b90600052602060002090600402016003015414905092915050565b6000611040836000868154811061102857fe5b906000526020600020906004020160020154846112da565b949350505050565b81336001600160a01b03166000828154811061106057fe5b60009182526020909120600490910201546001600160a01b0316146110c4576040805162461bcd60e51b815260206004820152601560248201527427b7363c903337b9103232bb34b1b29037bbb732b960591b604482015290519081900360640190fd5b60008381526003602052604090205483901561111c576040805162461bcd60e51b8152602060048201526012602482015271135d5cdd081b9bdd081899481cda59db995960721b604482015290519081900360640190fd5b600080858154811061112a57fe5b6000918252602082206004909102015481546001600160a01b0390911692508591908790811061115657fe5b6000918252602080832060049290920290910180546001600160a01b0319166001600160a01b039485161790553382526001808252604080842080546000190190558885168085529381902080549092019091558051938516845290830191909152805187927f848155b8e733cfd6e7258639111d906437ddb051818f4061fc4c7cfbc575cb2e92908290030190a25050505050565b600081516041146111ff57506000610fd2565b60208201516040830151606084015160001a7f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08211156112455760009350505050610fd2565b8060ff16601b1415801561125d57508060ff16601c14155b1561126e5760009350505050610fd2565b6040805160008152602080820180845289905260ff8416828401526060820186905260808201859052915160019260a0808401939192601f1981019281900390910190855afa1580156112c5573d6000803e3d6000fd5b5050604051601f190151979650505050505050565b600081815b85518110156113785760008682815181106112f657fe5b6020026020010151905080831161133d578281604051602001808381526020018281526020019250505060405160208183030381529060405280519060200120925061136f565b808360405160200180838152602001828152602001925050506040516020818303038152906040528051906020012092505b506001016112df565b509092149392505050565b60408051608081018252600080825260208201819052918101829052606081019190915290565b604051806080016040528060006001600160a01b031681526020016000815260200160008152602001600015158152509056fe4f6e6c7920666f722063726561746f72206f6620746865207369676e61747572655369676e6174757265206d7573746e2774206265207265766f6b656420616c7265616479a265627a7a72315820edb705f11d10b713f21c6928a577590176aa36beb1492397b63e8fba52a13c1164736f6c63430005100032";

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

    public static final String FUNC_REVOKESIGNATURE = "revokeSignature";

    public static final String FUNC_SIGNDEVICE = "signDevice";

    public static final String FUNC_SIGNATURES = "signatures";

    public static final String FUNC_TRANSFERDEVICE = "transferDevice";

    public static final String FUNC_UPDATEIDENTIFIER = "updateIdentifier";

    public static final String FUNC_UPDATEMETADATAHASH = "updateMetadataHash";

    public static final String FUNC_UPDATEFIRMWAREHASH = "updateFirmwareHash";

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

    public static final Event SIGNATUREREVOKED_EVENT = new Event("SignatureRevoked", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Uint256>(true) {}));
    ;

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
    }

    @Deprecated
    protected DeviceUpdatable(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected DeviceUpdatable(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected DeviceUpdatable(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected DeviceUpdatable(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
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

    public RemoteFunctionCall<TransactionReceipt> updateFirmwareHash(BigInteger _deviceId, byte[] _newFirmwareHash) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_UPDATEFIRMWAREHASH, 
                Arrays.<Type>asList(new Uint256(_deviceId),
                new Bytes32(_newFirmwareHash)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static DeviceUpdatable load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new DeviceUpdatable(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static DeviceUpdatable load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new DeviceUpdatable(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static DeviceUpdatable load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new DeviceUpdatable(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static DeviceUpdatable load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new DeviceUpdatable(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<DeviceUpdatable> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(DeviceUpdatable.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<DeviceUpdatable> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(DeviceUpdatable.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<DeviceUpdatable> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(DeviceUpdatable.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<DeviceUpdatable> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(DeviceUpdatable.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
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

    public static class SignatureRevokedEventResponse extends BaseEventResponse {
        public BigInteger signatureId;

        public BigInteger deviceId;
    }
}
