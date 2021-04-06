import { MerkleTree } from 'merkletreejs';
import { SHA256 } from 'crypto-js';
import md5 from 'md5';

const getMerkelRoot = (payload) => {
    return new Promise((resolve, reject) => {
        let keys = [];
        let ObjMd5 = [];
        for (var key in payload) {
            ObjMd5.push(md5(JSON.stringify(payload[key])));
            keys.push(key);
        }
        const leaves = ObjMd5.map(x => SHA256(x));
        const tree = new MerkleTree(leaves, SHA256);
        const root = tree.getRoot().toString('hex');
        let Obj = {
            MerkleRoot: root,
            depth: tree.getDepth(),
            keys: keys
        }
        resolve(Obj);
    })
};

const verify = (payload, keyToBeVerified, merkleRoot) => {
    return new Promise((resolve, reject) => {
        let ObjMd5 = [];
        let leaf = md5(JSON.stringify(payload[keyToBeVerified]));
        leaf = SHA256(leaf);
        for (var key in payload) {
            ObjMd5.push(md5(JSON.stringify(payload[key])));
        }
        const leaves = ObjMd5.map(x => SHA256(x));
        const tree = new MerkleTree(leaves, SHA256);
        const proof = tree.getProof(leaf);
        resolve(tree.verify(proof, leaf, merkleRoot));
    });
};

export { getMerkelRoot, verify }