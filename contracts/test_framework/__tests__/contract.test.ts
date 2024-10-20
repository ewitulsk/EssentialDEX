import {EssentialClient} from "../src/Essential-TS-SDK/src/rest-client"
import {SolutionData, PredicateAddress, Mutation, Solution, Word} from "../src/Essential-TS-SDK/src/solutions"
import {Account} from "../src/Essential-TS-SDK/src/account"
import { createHash } from 'crypto';

const LOCAL_SERVER = "https://bigbangblock.builders"

const CONTRACT = "938DC3D177411834100B5E6734509C89B59A9BB8316940F6378ABF89A5C21CC1" 
const ADD_LIQUIDITY_PREDICATE = "57A21B7969680BCEB3A6C42C408988B5D9FE95B3BA3F2C10952F79FE4BB72728"
const TEST_WALLET_PRIV_KEY = "118AE96C9B7BD0D346C46FFF031AFDB8F5F6F4C62D7D99FA225B5675AA26B70D"

test('test add liquidity', async () => {
    let essential = new EssentialClient(LOCAL_SERVER);
    //const data = await essential.queryState(CONTRACT, ["0000000000000000"]);
    //console.log(data)
    // let total_supply_lp = parseInt(data[3])
    // console.log("Total supply LP: " + total_supply_lp)

    let addLiquidityPredicateAddress = {
        contract: CONTRACT,
        predicate:  ADD_LIQUIDITY_PREDICATE
    } as PredicateAddress

    let pubkeyHex = Account.from_str(TEST_WALLET_PRIV_KEY).publicKey()
    const pubkey: Buffer = Buffer.from(pubkeyHex, 'hex');
    const i64Value: bigint = pubkeyToI64(pubkey);
    console.log(pubkey)
    let stateMut = {
        key: [0, 1, 2],
        value: [10, 20, 999]
    } as Mutation

    let solutionData = {
        predicate_to_solve: addLiquidityPredicateAddress,
        decision_variables: [[Number(i64Value.toString()), 10, 20]],
        transient_data: [],
        state_mutations: [stateMut]
    } as SolutionData

    let solution = new Solution([solutionData])
    let tx_hash = await essential.submitSolution(solution);
    console.log(tx_hash)

    const new_data = await essential.queryState(CONTRACT, ["0000000000000000"]);
    console.log(new_data)
    let new_total_supply_lp = parseInt(new_data[0])
    console.log("New total supply LP: " + new_total_supply_lp)
    expect(new_total_supply_lp).toEqual(15) 
});

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

