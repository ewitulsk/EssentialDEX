import {EssentialClient} from "../src/Essential-TS-SDK/src/rest-client"
import {SolutionData, PredicateAddress, Mutation, Solution, Word, Value} from "../src/Essential-TS-SDK/src/solutions"
import {Account} from "../src/Essential-TS-SDK/src/account"
import { createHash } from 'crypto';

const LOCAL_SERVER = "https://bigbangblock.builders"

const CONTRACT = "5D2283018463D8E97747BA20CE4EB053D11B38E4EF708F1EE2A7267D74832389" 
const MINT_USDC_PRED = "5F3A37CDA561A8B40870DB8758711FD668E2FD9551453056B88031E2607EB463"
const MINT_ESS_PRED = "AC34EA89B4BF9ADBE1A4BD7DECE8570359AD594379C926F13E5753C8AFC381F9"


// const ADD_LIQUIDITY_PREDICATE = "BD77574D5A00D8717E0726F33EB6922B5F0189D7AC4EED7BB336B8F9A483F776"
const TEST_WALLET_PRIV_KEY = "118AE96C9B7BD0D346C46FFF031AFDB8F5F6F4C62D7D99FA225B5675AA26B70D"


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// test('test add liquidity', async () => {
//     let essential = new EssentialClient(LOCAL_SERVER);
//     // const data = await essential.queryState(CONTRACT, ["0000000000000000"]);
//     // console.log(data)
//     // let total_supply_lp = parseInt(data[0])
//     // console.log("Total supply LP: " + total_supply_lp)

//     let addLiquidityPredicateAddress = {
//         contract: CONTRACT,
//         predicate:  ADD_LIQUIDITY_PREDICATE
//     } as PredicateAddress

//     let pubkeyHex = Account.from_str(TEST_WALLET_PRIV_KEY).publicKey()
//     const pubkey: Buffer = Buffer.from(pubkeyHex, 'hex');
//     const i64Value: bigint = pubkeyToI64(pubkey);

//     let stateMut = {
//         key: [0],
//         value: [1]
//     } as Mutation

//     let stateMut2 = {
//         key: [1],
//         value: [90]
//     } as Mutation

//     let stateMut3 = {
//         key: [2],
//         value: [5]
//     } as Mutation

//     let stateMut4 = {
//         key: [3, 4],
//         value: [60]
//     } as Mutation

//     let solutionData = {
//         predicate_to_solve: addLiquidityPredicateAddress,
//         decision_variables: [[4]],
//         transient_data: [],
//         state_mutations: [stateMut, stateMut2, stateMut3, stateMut4]
//     } as SolutionData

//     console.log("Solution Data:")
//     console.log(solutionData)

//     console.log("State Mutations:")
//     console.log(solutionData.state_mutations)

//     let solution = new Solution([solutionData])
//     let tx_hash = await essential.submitSolution(solution);
//     console.log(tx_hash)

//     await sleep(8000)

//     const new_data = await essential.queryState(CONTRACT, ["0000000000000000"]);
//     console.log(new_data)
//     const new_data2 = await essential.queryState(CONTRACT, ["0000000000000001"]);
//     console.log(new_data2)
//     const new_data3 = await essential.queryState(CONTRACT, ["0000000000000002"]);
//     console.log(new_data3)

//     const new_data4 = await essential.queryState(CONTRACT, ["0000000000000003"+"0000000000000004"]);
//     console.log(new_data4)


//     // // let new_total_supply_lp = parseInt(new_data[0])
//     // console.log("New total supply LP: " + new_total_supply_lp)
//     // expect(new_total_supply_lp).toEqual(15) 
// }, 1000000);

test('test mint usdc', async () => {
    let essential = new EssentialClient(LOCAL_SERVER);

    let addLiquidityPredicateAddress = {
        contract: CONTRACT,
        predicate:  MINT_USDC_PRED
    } as PredicateAddress


    let wallet = 1 //Wallet 0
    let mint_amount = 503;

    const before_amount = await essential.queryState(CONTRACT, ["0000000000000005"+"0000000000000001"]);
    
    let to_add = 0;

    if(before_amount != null){
        to_add = before_amount[0]
    }

    console.log(to_add);

    let stateMut = {
        key: [5, wallet],
        value: [mint_amount+to_add]
    } as Mutation

    let solutionData = {
        predicate_to_solve: addLiquidityPredicateAddress,
        decision_variables: [[wallet], [mint_amount]],
        transient_data: [],
        state_mutations: [stateMut]
    } as SolutionData

    console.log("Solution Data:")
    console.log(solutionData)

    console.log("State Mutations:")
    console.log(solutionData.state_mutations)

    let solution = new Solution([solutionData])
    let tx_hash = await essential.submitSolution(solution);
    console.log(tx_hash)

    await sleep(8000)

    const after_amount = await essential.queryState(CONTRACT, ["0000000000000005"+"0000000000000001"])
    console.log("After: "+after_amount)
    expect(after_amount).toEqual([mint_amount+to_add])
}, 1000000);

test('test mint ess', async () => {
    let essential = new EssentialClient(LOCAL_SERVER);

    let addLiquidityPredicateAddress = {
        contract: CONTRACT,
        predicate:  MINT_USDC_PRED
    } as PredicateAddress


    let wallet = 1 //Wallet 0
    let mint_amount = 503;

    const before_amount = await essential.queryState(CONTRACT, ["0000000000000005"+"0000000000000001"]);
    
    let to_add = 0;

    if(before_amount != null){
        to_add = before_amount[0]
    }

    console.log(to_add);

    let stateMut = {
        key: [5, wallet],
        value: [mint_amount+to_add]
    } as Mutation

    let solutionData = {
        predicate_to_solve: addLiquidityPredicateAddress,
        decision_variables: [[wallet], [mint_amount]],
        transient_data: [],
        state_mutations: [stateMut]
    } as SolutionData

    console.log("Solution Data:")
    console.log(solutionData)

    console.log("State Mutations:")
    console.log(solutionData.state_mutations)

    let solution = new Solution([solutionData])
    let tx_hash = await essential.submitSolution(solution);
    console.log(tx_hash)

    await sleep(8000)

    const after_amount = await essential.queryState(CONTRACT, ["0000000000000005"+"0000000000000001"])
    console.log("After: "+after_amount)
    expect(after_amount).toEqual([mint_amount+to_add])
}, 1000000);

test("", () => {
    console.log("test");
})

// Function to convert a public key to an i64 (using BigInt)
function pubkeyToI64(pubkey: Buffer): bigint {
    // Hash the public key using SHA-256
    const hash = createHash('sha256');
    hash.update(pubkey);
    const result = hash.digest();

    // Convert the first 8 bytes of the hash to a BigInt
    const bytes = result.slice(0, 8);
    let i64Value: bigint = BigInt(0);

    for (let i = 0; i < bytes.length; i++) {
        i64Value |= BigInt(bytes[i]) << BigInt(i * 8);
    }

    // If you want to treat it as a signed i64, apply the mask
    if (i64Value >= BigInt(2n ** BigInt(63))) {
        i64Value -= BigInt(2n ** BigInt(64)); // Convert to signed i64
    }

    return i64Value;
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

