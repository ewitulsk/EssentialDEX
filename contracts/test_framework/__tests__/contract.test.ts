import {EssentialClient} from "../src/Essential-TS-SDK/src/rest-client"
import {SolutionData, PredicateAddress, Mutation, Solution, Word, Value} from "../src/Essential-TS-SDK/src/solutions"
import {Account} from "../src/Essential-TS-SDK/src/account"
import { createHash } from 'crypto';
// import * from "dotenv";



const LOCAL_SERVER = "https://bigbangblock.builders"

const CONTRACT = "6D24926F8DBCFE7C5A755391AE27302955D24034C27D9F99FF9E0D6943A85DF9" 
const MINT_USDC_PRED = "5F3A37CDA561A8B40870DB8758711FD668E2FD9551453056B88031E2607EB463"
const MINT_ESS_PRED = "AA1C297BFECED97CD4D3F69AEE869FABAE1764DCF7796B5C46B04CAC66682062"
const ADD_LIQ_PRED = "A7002A5F22C6A38FE0B781EF3AC9ADFED92F906B199B1AA333913B28CF0C91EA"


// const ADD_LIQUIDITY_PREDICATE = "BD77574D5A00D8717E0726F33EB6922B5F0189D7AC4EED7BB336B8F9A483F776"
const TEST_WALLET_PRIV_KEY = "118AE96C9B7BD0D346C46FFF031AFDB8F5F6F4C62D7D99FA225B5675AA26B70D"


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// test('test mint usdc', async () => {
//     let essential = new EssentialClient(LOCAL_SERVER);

//     let addLiquidityPredicateAddress = {
//         contract: CONTRACT,
//         predicate:  MINT_USDC_PRED
//     } as PredicateAddress


//     let wallet = 1 //Wallet 0
//     let mint_amount = 503;

//     const before_amount = await essential.queryState(CONTRACT, ["0000000000000005"+"0000000000000001"]);
    
//     let to_add = 0;

//     if(before_amount != null){
//         to_add = before_amount[0]
//     }

//     console.log(to_add);

//     let stateMut = {
//         key: [5, wallet],
//         value: [mint_amount+to_add]
//     } as Mutation

//     let solutionData = {
//         predicate_to_solve: addLiquidityPredicateAddress,
//         decision_variables: [[wallet], [mint_amount]],
//         transient_data: [],
//         state_mutations: [stateMut]
//     } as SolutionData

//     console.log("Solution Data:")
//     console.log(solutionData)

//     console.log("State Mutations:")
//     console.log(solutionData.state_mutations)

//     let solution = new Solution([solutionData])
//     let tx_hash = await essential.submitSolution(solution);
//     console.log(tx_hash)

//     await sleep(8000)

//     const after_amount = await essential.queryState(CONTRACT, ["0000000000000005"+"0000000000000001"])
//     console.log("After: "+after_amount)
//     expect(after_amount).toEqual([mint_amount+to_add])
// }, 1000000);

// test('test mint ess', async () => {
//     let essential = new EssentialClient(LOCAL_SERVER);

//     let addLiquidityPredicateAddress = {
//         contract: CONTRACT,
//         predicate:  MINT_ESS_PRED
//     } as PredicateAddress


//     let wallet = 1 //Wallet 0
//     let mint_amount = 503;

//     const before_amount = await essential.queryState(CONTRACT, ["0000000000000006"+"0000000000000001"]);
    
//     let to_add = 0;

//     if(before_amount != null){
//         to_add = before_amount[0]
//     }

//     console.log(to_add);

//     let stateMut = {
//         key: [6, wallet],
//         value: [mint_amount+to_add]
//     } as Mutation

//     let solutionData = {
//         predicate_to_solve: addLiquidityPredicateAddress,
//         decision_variables: [[wallet], [mint_amount]],
//         transient_data: [],
//         state_mutations: [stateMut]
//     } as SolutionData

//     console.log("Solution Data:")
//     console.log(solutionData)

//     console.log("State Mutations:")
//     console.log(solutionData.state_mutations)

//     let solution = new Solution([solutionData])
//     let tx_hash = await essential.submitSolution(solution);
//     console.log(tx_hash)

//     await sleep(8000)

//     const after_amount = await essential.queryState(CONTRACT, ["0000000000000006"+"0000000000000001"])
//     console.log("After: "+after_amount)
//     expect(after_amount).toEqual([mint_amount+to_add])
// }, 1000000);

test('test add liquidity', async () => {
    let essential = new EssentialClient(LOCAL_SERVER);

    let addLiquidityPredicateAddress = {
        contract: CONTRACT,
        predicate:  ADD_LIQ_PRED
    } as PredicateAddress

    const usdc_before_raw = (await essential.queryState(CONTRACT, ["0000000000000000"]))
    let reserve_usdc_before = 0;
    if(usdc_before_raw != null){
        reserve_usdc_before = parseInt(usdc_before_raw[0])
    }
     
    const ess_before_raw = (await essential.queryState(CONTRACT, ["0000000000000001"]))
    let reserve_ess_before = 0;
    if(ess_before_raw != null){
        reserve_ess_before = parseInt(ess_before_raw[0])
    }

    const liq_before_raw = (await essential.queryState(CONTRACT, ["0000000000000003"]))
    let liq_before = 0;
    if(liq_before_raw != null){
        liq_before = parseInt(liq_before_raw[0])
    }

    console.log("Before:"+reserve_usdc_before)
    console.log("Before:"+reserve_ess_before)

    let wallet = 1 //Wallet 0

    //DECISION & STATE
    let usdc_add = 500; //standard 
    let ess_add = 504; //standard

    //STATE CHANGES
    let reserve_usdc = usdc_add + reserve_usdc_before // + old (i: 0)
    let reserve_ess = ess_add + reserve_ess_before// + old (i: 1)

    

    let nonce = 1; //mapping [wallet => this] (i: 4)
    let provider_usdc_balance = 300; //mapping [wallet => this] (i: 5)
    let provider_ess_balance = 308; //mapping [wallet => this] (i: 6)

    let lp_usdc = Math.floor((usdc_add * (reserve_usdc + reserve_ess)) / (reserve_usdc + usdc_add));
    let lp_ess = Math.floor((ess_add * (reserve_usdc + reserve_ess)) / (reserve_ess + ess_add));
    let x = Math.floor((usdc_add / (usdc_add + reserve_usdc))) * ((reserve_usdc + reserve_ess) + usdc_add)
    let y = Math.floor((ess_add / (ess_add + reserve_ess))) * ((reserve_usdc + reserve_ess) + ess_add)

    // constraint mint_lp == cond {
    //     reserve_usdc == nil => (amount_usdc * amount_ess) / 10, //- MINIMUM_LIQUIDITY, //TODO:
    //     else => x < y ? x : y
    // };   

    let mint_lp = 0;
    if(usdc_before_raw == null){
        mint_lp = Math.floor((usdc_add * ess_add)/10)
    }
    else{
        mint_lp = Math.min(x, y);
    }

    console.log("Expected Mint: "+mint_lp);

    let lp_total = mint_lp + liq_before; //mapping [wallet => this] (i: 3)
    let total_supply_lp = lp_total //+old //standard (i: 2) //Not used, but I'm not going to change...

    //DESCISION VARIABLES
    let decision_variables = [
        [wallet],
        [usdc_add],
        [ess_add],
        [lp_usdc],
        [lp_ess],
        [x],
        [y],
        [mint_lp]
    ]

    let stateMuts = [
        {
            key: [0],
            value: [reserve_usdc]
        },
        {
            key: [1],
            value: [reserve_ess]
        },
        {
            key: [2],
            value: [total_supply_lp]
        },
        {
            key: [3, wallet],
            value: [lp_total]
        },
        {
            key: [4, wallet],
            value: [nonce]
        },
        {
            key: [5, wallet],
            value: [provider_usdc_balance]
        },
        {
            key: [6, wallet],
            value: [provider_ess_balance]
        }   
    ] as Mutation[]
    

    let solutionData = {
        predicate_to_solve: addLiquidityPredicateAddress,
        decision_variables: decision_variables,
        transient_data: [],
        state_mutations: stateMuts
    } as SolutionData

    console.log("Solution Data:")
    console.log(solutionData)

    console.log("State Mutations:")
    console.log(solutionData.state_mutations)

    let solution = new Solution([solutionData])
    let tx_hash = await essential.submitSolution(solution);
    console.log(tx_hash)

    await sleep(8000)

    const reserve_usdc_after = await essential.queryState(CONTRACT, ["0000000000000000"])
    console.log(reserve_usdc_after)
    expect(reserve_usdc_after).toEqual([reserve_usdc])
    
    const reserve_ess_after = await essential.queryState(CONTRACT, ["0000000000000001"])
    expect(reserve_ess_after).toEqual([reserve_ess])

    const lp_balance_after = await essential.queryState(CONTRACT, ["0000000000000003" + "0000000000000001"])
    expect(lp_balance_after).toEqual([lp_total])

    const total_supply_lp_after = await essential.queryState(CONTRACT, ["0000000000000002"])
    expect(total_supply_lp_after).toEqual([total_supply_lp])

    const nonce_after = await essential.queryState(CONTRACT, ["0000000000000004" + "0000000000000001"])
    expect(nonce_after).toEqual([nonce])
    
    const provider_usdc_balance_after = await essential.queryState(CONTRACT, ["0000000000000005" + "0000000000000001"])
    expect(provider_usdc_balance_after).toEqual([provider_usdc_balance])

    const provider_ess_balance_after = await essential.queryState(CONTRACT, ["0000000000000006" + "0000000000000001"])
    expect(provider_ess_balance_after).toEqual([provider_ess_balance])

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

