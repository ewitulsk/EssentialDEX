// import * as secp256k1 from "secp256k1";
import { secp256k1 } from "@noble/curves/secp256k1";
import { randomBytes } from "crypto";

import { sha256 } from '@noble/hashes/sha2';
import { Word, Hash } from "./solutions"
import { fromHexString, toHexString } from "./utils"


function bytesFromWord(word: Word): Uint8Array{
    let buff = new ArrayBuffer(8)
    const dataView = new DataView(buff).setBigUint64(0, BigInt(word));
    return new Uint8Array(buff);
}

// Function to hash words
function hashWords(words: Word[]): Hash {
    // Convert each word to bytes and flatten the resulting arrays
    const data: Uint8Array[] = words
        .map(bytesFromWord)  // Convert each Word to a Uint8Array
        .flat();             // Flatten the array of Uint8Arrays into a single array

    // Create SHA-256 hash
    const hasher = sha256.create();
    hasher.update(Buffer.concat(data)); // Concatenate all Uint8Arrays into a single buffer
    return hasher.digest();              // Return the hash as a Buffer
}

export class Signature {
    // Compact signature
    sig: Uint8Array 
    //ID used for public key recovery
    recovery_id: number //Should be a u8 (between 0 and 255)
    constructor(_sig: Uint8Array, _recovery_id: number){
        if(_recovery_id < 0 || _recovery_id > 255){
            throw Error("Recovery id must be a u8")
        }
        this.sig = _sig
        this.recovery_id = _recovery_id
    }
}

function signHash(hash: Hash, pk: Uint8Array) {
    // const sigObj = secp256k1.ecdsaSign(hash, pk)
    // new Signature(sigObj.signature, sigObj.recid)
}
 

export class Account {
    privKey: Uint8Array;

    constructor(privKey: Uint8Array){
        this.privKey = privKey        
    }

    static from_str(privKey_str: string){
        let privKey = fromHexString(privKey_str);
        return new Account(privKey)
    }

    static generate(): Account {
        let privKey = randomBytes(32)
        return new Account(privKey)
    }

    publicKey(_compressed: boolean = true){
        const bytes = secp256k1.getPublicKey(this.privKey, _compressed);
        let pub_str = toHexString(bytes)
        return pub_str
    }

    privateKey(){
        return toHexString(this.privKey);
    }

    //The odds of the working are VERY low
    signWords(words: Word[], pk: Uint8Array){
        let hash = hashWords(words)
        signHash(hash, pk)
    }
    


    
}