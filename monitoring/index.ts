// import { PostQuantumAlgorithm } from "./base";
// import { DilithiumAlgorithm } from "./dilithium";
// import { FalconAlgorithm } from "./falcon";

// function getRandomNumber(min: number, max: number) {
//     // Generates a random number between min (inclusive) and max (exclusive)
//     return Math.floor(Math.random() * (max - min) + min);
// }

// const dilithium: PostQuantumAlgorithm = new DilithiumAlgorithm()

// setInterval(() => dilithium.performSigning(getRandomNumber(100, 1000), getRandomNumber(10000, 30000)), 3000)

// /*

// Since we know the execution time, we can calculate the energy used by the CPU by looking up the power consumption on the datasheet. For example, a 2.2 GHz P4 with a 400 MHz FSB has a typical Vcc of 1.3725 Volts and Icc of 47.9 Amps which is (1.3725*47.9=) 28W. 

// Since we know our loop of x algorithm cycles took z seconds, we assume a single loop will take z/x = y seconds.

// The amount of energy consumed by our algorithm would then be 65.74 watts * y = k watt seconds (or joules).

// An irish utility company charges around 138.19 Euro per 497,484,000,000 Joules so this algorithm would cost c = (138.19 * k) / 497,484,000,000 on a P4

// */

// https://api.beta.explorer.cardano.org/api/v1/blocks?page=0&size=100&sort=


import * as fs from 'fs'

let globalPage = 1;

async function fetchEthereumBlock(page: number) {

    try {

        const response = await fetch(`https://explorer-web.api.btc.com/v1/eth/blocks?page=${page}&size=150`)

        const result = await response.json();

        type Block = {
            block_height: string,
            created_ts: string,
            block_reward: string,
            block_size: string,
            total_tx: string,
            gas_used: string,
            gas_avg_price: string,
            block_time_in_sec: string,
            base_fee_per_gas: string,
        }

        const blocks: Block[] = result.data.list;

        const blocksData = blocks.map(block => {
            return {
                block_number: block.block_height,
                created_ts: block.created_ts,
                block_reward: block.block_reward,
                block_size: block.block_size,
                total_tx: block.total_tx,
                gas_used: block.gas_used,
                gas_avg_price: block.gas_avg_price,
                block_time_in_sec: block.block_time_in_sec,
                base_fee_per_gas: block.base_fee_per_gas,
            }
        })

        // Convert blocksData to CSV format
        const csvContent = blocksData.map(block => Object.values(block).join(',')).join('\n');

        return csvContent;

    }
    catch (err) {
        console.log(err);
        throw err;
    }

}

async function fetchEthereumBlocks() {

    const blockPromises: any[] = []

    for (let page = globalPage; page < globalPage + 5; page++)
    {
        blockPromises.push(fetchEthereumBlock(page))
    }

    const blocksInfo = await Promise.all(blockPromises);

    fs.appendFileSync('ethereum_blocks.csv', blocksInfo.join('\n'))

    console.log(`Scraped pages: ${globalPage}-${globalPage + 5}`)

    globalPage += 5

}

setInterval(() => {
    fetchEthereumBlocks()
}, 5000)
