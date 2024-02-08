import * as fs from 'fs'

let globalLatestBlock = 9898300;

async function fetchCardanoBlock(lower: number, upper: number) {

    try {

        const request = await fetch("https://explorer.cardano.org/graphql", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Opera GX\";v=\"106\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "cookie": "ajs_anonymous_id=%228f77684e-a9b6-4bdd-a258-50a315885617%22; _ga=GA1.2.257071172.1707220189; _gid=GA1.2.1482409626.1707220189",
                "Referer": "https://explorer.cardano.org/en/browse-blocks.html",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": `{\"query\":\"query getBlocksInRange($lower: Int!, $upper: Int!) {\\n  blocks(order_by: {number: desc_nulls_last}, where: {number: {_gte: $lower, _lte: $upper}}) {\\n    ...BlockOverview\\n  }\\n}\\n\\nfragment BlockOverview on Block {\\n  forgedAt\\n  slotLeader {\\n    description\\n  }\\n  epochNo\\n  hash\\n  number\\n  size\\n  slotNo\\n  transactions_aggregate {\\n    aggregate {\\n      count\\n      sum {\\n        totalOutput\\n      }\\n    }\\n  }\\n}\\n\",\"variables\":{\"lower\":${lower},\"upper\":${upper}}}`,
            "method": "POST"
        });

        const result = await request.json();

        const blocksData = result.data.blocks.map((block: any) => {
            return {
                blockNo: block.number,
                blockSize: block.size,
            }
        })

        // Convert blocksData to CSV format
        const csvContent = blocksData.map((block: any) => Object.values(block).join(',')).join('\n');

        return csvContent;
    }
    catch (err) {
        console.log(err)
    }
}

async function fetchCardanoBlocks() {

    const blocksInfo = await fetchCardanoBlock(globalLatestBlock - 2000, globalLatestBlock)

    fs.appendFileSync('cardano_blocks.csv', blocksInfo)

    console.log(`Scraped blocks: ${globalLatestBlock - 2000}-${globalLatestBlock}`)

    globalLatestBlock -= 2000

}

setInterval(() => {
    if (globalLatestBlock <= 8300000) {
        process.exit()
    } else {
        fetchCardanoBlocks()
    }
}, 5000)

/* 

let globalPage = 14972;

async function fetchCaradanoBlock(page: number) {

    try {

        const response = await fetch(`https://api.beta.explorer.cardano.org/api/v1/blocks?page=${page}&size=100&sort=`)

        const result = await response.json();

        type Block = {
            blockNo: string,
            time: string,
            txCount: string,
            totalFees: string
        }

        const blocks: Block[] = result.data;

        const blocksData = blocks.map(block => {
            return {
                BlockNo: block.blockNo,
                Timestamp: new Date(block.time).getTime(),
                txCount: block.txCount,
                totalFees: block.totalFees
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

async function fetchCaradanoBlocks() {

    const blocksInfo = await fetchCaradanoBlock(globalPage);

    fs.appendFileSync('cardano_blocks.csv', blocksInfo)

    console.log(`Scraped pages: ${globalPage} of ${16000}`)

    globalPage += 1

}

setInterval(() => {
    fetchCaradanoBlocks()
}, 5000)

*/