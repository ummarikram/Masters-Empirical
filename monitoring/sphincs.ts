import { sphincs } from 'sphincs';
import { PostQuantumAlgorithm } from './base';

export class FalconAlgorithm implements PostQuantumAlgorithm {

    async generateKeys(): Promise<{ privateKey: Uint8Array; publicKey: Uint8Array; }> {
        return await sphincs.keyPair()
    }

    async sign(message: Uint8Array, privateKey: Uint8Array): Promise<Uint8Array> {
        return await sphincs.signDetached(message, privateKey)
    }

    async verify(signature: Uint8Array, message: Uint8Array, publicKey: Uint8Array): Promise<Boolean> {
        return await sphincs.verifyDetached(signature, message, publicKey)
    }

    async performSigning(noOfMessages: number, messageLengthBytes: number) {
        
        const keyPair = await this.generateKeys();
        const message = new Uint8Array(messageLengthBytes);

        // Array to store promises for signing and verifying
        const signingPromises = [];

        // Start Clock
        const signStart = performance.now();

        for (let i = 0; i < noOfMessages; i++) {
            // Push promises for signing
            signingPromises.push(this.sign(message, keyPair.privateKey));
        }

        // Wait for all messages to be signed
        await Promise.all(signingPromises);

        // End Clock
        const signEnd = performance.now();

        // Measure the total time for signing
        const totalSignTime = (signEnd - signStart) / 1000;

        // Calculate and log the timings
        console.log(`Sphincs Total time for ${noOfMessages} messages: ${totalSignTime} seconds`);
      
        console.log(`Sphincs Average time per message: ${totalSignTime/noOfMessages} seconds`);
    }
}
