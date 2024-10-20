import {EssentialClient} from "../src/Essential-TS-SDK/src/rest-client"
import {SolutionData, PredicateAddress, Mutation, Solution, Word, Value} from "../src/Essential-TS-SDK/src/solutions"
import {Account} from "../src/Essential-TS-SDK/src/account"
import { createHash } from 'crypto';

const LOCAL_SERVER = "https://bigbangblock.builders"

<<<<<<< HEAD
const CONTRACT = "EC55D953909B85A156853A8C954C3F89A2931BBE8DD7214DC7FA14C0BAE32AB7" 
const ADD_LIQUIDITY_PREDICATE = "BEF4CBC4A67AA9B6633AA457CE39B0695DB0F592EDD4E6F86868A6F8E8EBA3C2"
=======
const CONTRACT = "F7BD71739448FE6644F9BAC5A717E22222C73CB98259DC7AE94A0B4D020C0BEF" 
const ADD_LIQUIDITY_PREDICATE = "7CAC6B138B69A86747E8E2DC8DBBECE472567868774B006C44152AAE735B4B4D"
>>>>>>> 417e4c3 (decision variables work)
const TEST_WALLET_PRIV_KEY = "118AE96C9B7BD0D346C46FFF031AFDB8F5F6F4C62D7D99FA225B5675AA26B70D"

test('test add liquidity', async () => {
    let essential = new EssentialClient(LOCAL_SERVER);
    // const data = await essential.queryState(CONTRACT, ["0000000000000000"]);
    // console.log(data)
    // let total_supply_lp = parseInt(data[0])
    // console.log("Total supply LP: " + total_supply_lp)

    let addLiquidityPredicateAddress = {
        contract: CONTRACT,
        predicate:  ADD_LIQUIDITY_PREDICATE
    } as PredicateAddress

    let pubkeyHex = Account.from_str(TEST_WALLET_PRIV_KEY).publicKey()
    const pubkey: Buffer = Buffer.from(pubkeyHex, 'hex');
    const i64Value: bigint = pubkeyToI64(pubkey);

    let stateMut = {
        key: [0],
        value: [30]
    } as Mutation

    let stateMut2 = {
        key: [1],
        value: [50]
    } as Mutation

    let decision_variables = [30] as Value

    // let stateMut2 = {
    //     key: [1],
    //     value: [20]
    // } as Mutation

    let solutionData = {
        predicate_to_solve: addLiquidityPredicateAddress,
        decision_variables: [decision_variables],
        transient_data: [],
        state_mutations: [stateMut, stateMut2]
    } as SolutionData

    // console.log("Solution Data:")
    // console.log(solutionData)

    // let solution = new Solution([solutionData])
    // let tx_hash = await essential.submitSolution(solution);
    // console.log(tx_hash)

    await sleep(5000)

    const new_data = await essential.queryState(CONTRACT, ["0000000000000000"]);
    console.log(new_data)
    const new_data2 = await essential.queryState(CONTRACT, ["0000000000000001"]);
    console.log(new_data2)
    // // let new_total_supply_lp = parseInt(new_data[0])
    // console.log("New total supply LP: " + new_total_supply_lp)
    // expect(new_total_supply_lp).toEqual(15) 
}, 10000);

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

