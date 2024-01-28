import { dilithium } from 'dilithium-crystals';

const keyPair /*: {privateKey: Uint8Array; publicKey: Uint8Array} */ =
    await dilithium.keyPair()
    ;

const message /*: Uint8Array */ =
    new Uint8Array([104, 101, 108, 108, 111, 0]) // "hello"
    ;

/* Combined signatures */

const signed /*: Uint8Array */ =
    await dilithium.sign(message, keyPair.privateKey)
    ;

const verified /*: Uint8Array */ =
    await dilithium.open(signed, keyPair.publicKey) // same as message
    ;

/* Detached signatures */

const signature /*: Uint8Array */ =
    await dilithium.signDetached(message, keyPair.privateKey)
    ;

const isValid /*: boolean */ =
    await dilithium.verifyDetached(signature, message, keyPair.publicKey) // true
    ;

console.log(keyPair);
console.log(message);
console.log(signed);
console.log(verified);
console.log(signature);
console.log(isValid);