import { PostQuantumAlgorithm } from "./base";
import { DilithiumAlgorithm } from "./dilithium";
import { FalconAlgorithm } from "./falcon";

function getRandomNumber(min: number, max: number) {
    // Generates a random number between min (inclusive) and max (exclusive)
    return Math.floor(Math.random() * (max - min) + min);
}

const dilithium: PostQuantumAlgorithm = new DilithiumAlgorithm()

setInterval(() => dilithium.performSigning(getRandomNumber(100, 1000), getRandomNumber(10000, 30000)), 3000)

/*

Since we know the execution time, we can calculate the energy used by the CPU by looking up the power consumption on the datasheet. For example, a 2.2 GHz P4 with a 400 MHz FSB has a typical Vcc of 1.3725 Volts and Icc of 47.9 Amps which is (1.3725*47.9=) 28W. 

Since we know our loop of x algorithm cycles took z seconds, we assume a single loop will take z/x = y seconds.

The amount of energy consumed by our algorithm would then be 65.74 watts * y = k watt seconds (or joules).

An irish utility company charges around 138.19 Euro per 497,484,000,000 Joules so this algorithm would cost c = (138.19 * k) / 497,484,000,000 on a P4

*/



