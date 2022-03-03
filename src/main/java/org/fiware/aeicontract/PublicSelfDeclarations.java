package org.fiware.aeicontract;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
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
public class PublicSelfDeclarations extends Contract {
    public static final String BINARY = "Bin file was not provided";

    public static final String FUNC_GETDECLARATION = "getDeclaration";

    public static final String FUNC_GETPARTICIPANTBYINDEX = "getParticipantByIndex";

    public static final String FUNC_NUMBEROFDECLARATIONS = "numberOfDeclarations";

    public static final String FUNC_SELFDECLARE = "selfDeclare";

    @Deprecated
    protected PublicSelfDeclarations(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected PublicSelfDeclarations(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected PublicSelfDeclarations(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected PublicSelfDeclarations(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<Tuple5<BigInteger, String, String, String, BigInteger>> getDeclaration(String declarationHash) {
        final Function function = new Function(FUNC_GETDECLARATION, 
                Arrays.<Type>asList(new Utf8String(declarationHash)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Address>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple5<BigInteger, String, String, String, BigInteger>>(function,
                new Callable<Tuple5<BigInteger, String, String, String, BigInteger>>() {
                    @Override
                    public Tuple5<BigInteger, String, String, String, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple5<BigInteger, String, String, String, BigInteger>(
                                (BigInteger) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (String) results.get(2).getValue(), 
                                (String) results.get(3).getValue(), 
                                (BigInteger) results.get(4).getValue());
                    }
                });
    }

    public RemoteFunctionCall<String> getParticipantByIndex(String declarationHash, BigInteger participantIndex) {
        final Function function = new Function(FUNC_GETPARTICIPANTBYINDEX, 
                Arrays.<Type>asList(new Utf8String(declarationHash),
                new Uint256(participantIndex)),
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> numberOfDeclarations() {
        final Function function = new Function(FUNC_NUMBEROFDECLARATIONS, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> selfDeclare(String declarationHash, String offchainURI, String payload) {
        final Function function = new Function(
                FUNC_SELFDECLARE, 
                Arrays.<Type>asList(new Utf8String(declarationHash),
                new Utf8String(offchainURI),
                new Utf8String(payload)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static PublicSelfDeclarations load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new PublicSelfDeclarations(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static PublicSelfDeclarations load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new PublicSelfDeclarations(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static PublicSelfDeclarations load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new PublicSelfDeclarations(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static PublicSelfDeclarations load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new PublicSelfDeclarations(contractAddress, web3j, transactionManager, contractGasProvider);
    }
}
