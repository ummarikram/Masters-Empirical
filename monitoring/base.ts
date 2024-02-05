export interface PostQuantumAlgorithm {
    generateKeys(): Promise<{ privateKey: Uint8Array; publicKey: Uint8Array; }>
    sign(message: Uint8Array, privateKey: Uint8Array): Promise<Uint8Array>
    verify(signature: Uint8Array, message: Uint8Array, publicKey: Uint8Array): Promise<Boolean>;
    performSigning(noOfMessages: number, messageLengthBytes: number): Promise<void>;
}