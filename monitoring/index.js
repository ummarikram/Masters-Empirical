const { dilithium } = require('dilithium-crystals');
const { falcon } = require('falcon-crypto');
const { sphincs } = require('sphincs');

async function runDilithium() {

    const keyPair = await dilithium.keyPair();

    const message = new Uint8Array([104, 101, 108, 108, 111, 0]);

    const signed = await dilithium.sign(message, keyPair.privateKey);

    const verified = await dilithium.open(signed, keyPair.publicKey);

    const signature = await dilithium.signDetached(message, keyPair.privateKey);

    const isValid = await dilithium.verifyDetached(signature, message, keyPair.publicKey);

    console.log(keyPair);
    console.log(message);
    console.log(signed);
    console.log(verified);
    console.log(signature);
    console.log(isValid);
}

async function runFalcon() {

    const keyPair = await falcon.keyPair();

    const message = new Uint8Array([104, 101, 108, 108, 111, 0]);

    const signed = await falcon.sign(message, keyPair.privateKey);

    const verified = await falcon.open(signed, keyPair.publicKey);

    const signature = await falcon.signDetached(message, keyPair.privateKey);

    const isValid = await falcon.verifyDetached(signature, message, keyPair.publicKey);

    console.log(keyPair);
    console.log(message);
    console.log(signed);
    console.log(verified);
    console.log(signature);
    console.log(isValid);
}

async function runSphincs() {

    const keyPair = await sphincs.keyPair();

    const message = new Uint8Array([104, 101, 108, 108, 111, 0]);

    const signed = await sphincs.sign(message, keyPair.privateKey);

    const verified = await sphincs.open(signed, keyPair.publicKey);

    const signature = await sphincs.signDetached(message, keyPair.privateKey);

    const isValid = await sphincs.verifyDetached(signature, message, keyPair.publicKey);

    console.log(keyPair);
    console.log(message);
    console.log(signed);
    console.log(verified);
    console.log(signature);
    console.log(isValid);
}

runFalcon()
runDilithium()
runSphincs()