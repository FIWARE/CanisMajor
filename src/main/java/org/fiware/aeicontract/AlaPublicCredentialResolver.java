package org.fiware.aeicontract;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.DynamicBytes;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Bytes32;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple2;
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
public class AlaPublicCredentialResolver extends Contract {
    public static final String BINARY = "Bin file was not provided";

    public static final String FUNC_ADDPARTICIPANT = "addParticipant";

    public static final String FUNC_CONFIRMCREDENTIAL = "confirmCredential";

    public static final String FUNC_CREDENTIAL = "credential";

    public static final String FUNC_CREDENTIALPARTICIPANT = "credentialParticipant";

    public static final String FUNC_HASH = "hash";

    public static final String FUNC_SETCREDENTIAL = "setCredential";

    public static final String FUNC_SUPPORTSINTERFACE = "supportsInterface";

    @Deprecated
    protected AlaPublicCredentialResolver(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected AlaPublicCredentialResolver(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected AlaPublicCredentialResolver(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected AlaPublicCredentialResolver(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<TransactionReceipt> addParticipant(byte[] node, String key, byte[] partDIDHash) {
        final Function function = new Function(
                FUNC_ADDPARTICIPANT, 
                Arrays.<Type>asList(new Bytes32(node),
                new org.web3j.abi.datatypes.Utf8String(key), 
                new Bytes32(partDIDHash)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> confirmCredential(byte[] node, String key, byte[] partDIDHash) {
        final Function function = new Function(
                FUNC_CONFIRMCREDENTIAL, 
                Arrays.<Type>asList(new Bytes32(node),
                new org.web3j.abi.datatypes.Utf8String(key), 
                new Bytes32(partDIDHash)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Tuple2<byte[], BigInteger>> credential(byte[] node, String key) {
        final Function function = new Function(FUNC_CREDENTIAL, 
                Arrays.<Type>asList(new Bytes32(node),
                new org.web3j.abi.datatypes.Utf8String(key)), 
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
        final Function function = new Function(FUNC_CREDENTIALPARTICIPANT, 
                Arrays.<Type>asList(new Bytes32(node),
                new org.web3j.abi.datatypes.Utf8String(key), 
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

    public RemoteFunctionCall<byte[]> hash(String data) {
        final Function function = new Function(FUNC_HASH, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(data)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bytes32>() {}));
        return executeRemoteCallSingleValueReturn(function, byte[].class);
    }

    public RemoteFunctionCall<TransactionReceipt> setCredential(byte[] node, String key, byte[] credentialHash, byte[] part1DIDhash, byte[] part2DIDhash, byte[] part3DIDhash, byte[] part4DIDhash, byte[] part5DIDhash) {
        final Function function = new Function(
                FUNC_SETCREDENTIAL, 
                Arrays.<Type>asList(new Bytes32(node),
                new org.web3j.abi.datatypes.Utf8String(key), 
                new DynamicBytes(credentialHash),
                new Bytes32(part1DIDhash),
                new Bytes32(part2DIDhash),
                new Bytes32(part3DIDhash),
                new Bytes32(part4DIDhash),
                new Bytes32(part5DIDhash)),
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Boolean> supportsInterface(byte[] interfaceID) {
        final Function function = new Function(FUNC_SUPPORTSINTERFACE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes4(interfaceID)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    @Deprecated
    public static AlaPublicCredentialResolver load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new AlaPublicCredentialResolver(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static AlaPublicCredentialResolver load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new AlaPublicCredentialResolver(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static AlaPublicCredentialResolver load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new AlaPublicCredentialResolver(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static AlaPublicCredentialResolver load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new AlaPublicCredentialResolver(contractAddress, web3j, transactionManager, contractGasProvider);
    }
}
