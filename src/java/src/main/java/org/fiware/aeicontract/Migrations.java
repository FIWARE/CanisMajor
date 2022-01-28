package org.fiware.aeicontract;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
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
public class Migrations extends Contract {
    public static final String BINARY = "0x6080604052600080546001600160a01b0319163317905534801561002257600080fd5b50610251806100326000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80630900f01014610051578063445df0ac146100795780638da5cb5b14610093578063fdacd576146100b7575b600080fd5b6100776004803603602081101561006757600080fd5b50356001600160a01b03166100d4565b005b610081610186565b60408051918252519081900360200190f35b61009b61018c565b604080516001600160a01b039092168252519081900360200190f35b610077600480360360208110156100cd57600080fd5b503561019b565b6000546001600160a01b0316331461011d5760405162461bcd60e51b81526004018080602001828103825260338152602001806101ea6033913960400191505060405180910390fd5b6000819050806001600160a01b031663fdacd5766001546040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b15801561016a57600080fd5b505af115801561017e573d6000803e3d6000fd5b505050505050565b60015481565b6000546001600160a01b031681565b6000546001600160a01b031633146101e45760405162461bcd60e51b81526004018080602001828103825260338152602001806101ea6033913960400191505060405180910390fd5b60015556fe546869732066756e6374696f6e206973207265737472696374656420746f2074686520636f6e74726163742773206f776e6572a265627a7a72315820ec1be419ab2c4c2051db6d1a80d2cf9410555f08010908629f49680b93563f9864736f6c63430005100032";

    public static final String FUNC_LAST_COMPLETED_MIGRATION = "last_completed_migration";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_SETCOMPLETED = "setCompleted";

    public static final String FUNC_UPGRADE = "upgrade";

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
        _addresses.put("1617804903916", "0x89B9b9bfC198268848cF4229b68CB32D942e4a29");
        _addresses.put("1618498732716", "0xc243C8358bD6307DF612ac34d51A10FC980FE3e4");
        _addresses.put("1618398382436", "0x9Cc1e0D61c886F57090e0D954e43F361Af69ccF6");
        _addresses.put("1619086054615", "0x0d35EbFab86168e52f96B2aB885a7877434d8Caf");
        _addresses.put("1617709724369", "0xEd0ecA4ff1f975825A5b05e6B54C44e32EC7b4bA");
        _addresses.put("1337", "0x42699A7612A82f1d9C36148af9C77354759b210b");
        _addresses.put("1617365909762", "0xf6282290029712A308CBBc760F115188EAb0ceE7");
        _addresses.put("1617272107202", "0x3343751Aad392Af7745c2045B215FAE582E1DD40");
        _addresses.put("1617285198954", "0xF2eac05e16cFD84Bb0CD87934F90C52A65a8Bb5b");
        _addresses.put("1617621053468", "0xf8A08255dcDe1D2666f43Acf7F3348A7cc671c84");
        _addresses.put("1617798936883", "0xEb8927d7A4D3e4113a6E5C5D680810d0c10271a6");
        _addresses.put("1617285142538", "0xFb63cA11AFC752dAb56EAd10B0006d839665228c");
        _addresses.put("1617123352796", "0x033dd5a53b403af59893c50519b39d272a5467d8");
        _addresses.put("10", "0x6d28F9329835526B2674Ce6fE014beFF2C365E2e");
    }

    @Deprecated
    protected Migrations(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Migrations(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Migrations(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Migrations(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<BigInteger> last_completed_migration() {
        final Function function = new Function(FUNC_LAST_COMPLETED_MIGRATION, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> owner() {
        final Function function = new Function(FUNC_OWNER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> setCompleted(BigInteger completed) {
        final Function function = new Function(
                FUNC_SETCOMPLETED, 
                Arrays.<Type>asList(new Uint256(completed)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> upgrade(String new_address) {
        final Function function = new Function(
                FUNC_UPGRADE, 
                Arrays.<Type>asList(new Address(new_address)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static Migrations load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Migrations(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Migrations load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Migrations(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Migrations load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new Migrations(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Migrations load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new Migrations(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<Migrations> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Migrations.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Migrations> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Migrations.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<Migrations> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Migrations.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Migrations> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Migrations.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    protected String getStaticDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static String getPreviouslyDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }
}
