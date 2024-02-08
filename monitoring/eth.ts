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

    for (let page = globalPage; page < globalPage + 5; page++) {
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
