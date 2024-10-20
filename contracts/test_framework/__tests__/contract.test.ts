import {EssentialClient} from "../src/Essential-TS-SDK/src/rest-client"
import {SolutionData, PredicateAddress, Mutation, Solution, Word, Value} from "../src/Essential-TS-SDK/src/solutions"
import {Account} from "../src/Essential-TS-SDK/src/account"
import { createHash } from 'crypto';
// import * from "dotenv";



const LOCAL_SERVER = "https://bigbangblock.builders"

const CONTRACT = "CDE35CAE90D37B5E4C3E6EA6B0DDBD6AD65C1676451D33B36B058D8D35A20D9E" 
const MINT_USDC_PRED = "5F3A37CDA561A8B40870DB8758711FD668E2FD9551453056B88031E2607EB463"
const MINT_ESS_PRED = "AA1C297BFECED97CD4D3F69AEE869FABAE1764DCF7796B5C46B04CAC66682062"
const ADD_LIQ_PRED = "A366B03643862475A71709883E0A3065E93A28CE23C44A3CA85CAB854E62D330"
const SWAP_PRED = "03EF6300662CF00DB3C486849984E5E06AF20F4200400C005517ED371165AA85"


// const ADD_LIQUIDITY_PREDICATE = "BD77574D5A00D8717E0726F33EB6922B5F0189D7AC4EED7BB336B8F9A483F776"
const TEST_WALLET_PRIV_KEY = "118AE96C9B7BD0D346C46FFF031AFDB8F5F6F4C62D7D99FA225B5675AA26B70D"


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//WALLET CAN NOT BE GREATER THAN 9
async function usdc_bal(wallet: number){
    if(wallet > 9){
        throw Error("WALLET CANT BE GREATER THAN 9");
    }
    let essential = new EssentialClient(LOCAL_SERVER);

    const before_amount_raw = await essential.queryState(CONTRACT, ["0000000000000005"+"000000000000000"+wallet.toString()]);
    let before_amount = 0;
    if(before_amount_raw != null){
        before_amount = parseInt(before_amount_raw[0])
    }
    return before_amount
}

//WALLET CAN NOT BE GREATER THAN 9
async function ess_bal(wallet: number){
    if(wallet > 9){
        throw Error("WALLET CANT BE GREATER THAN 9");
    }
    let essential = new EssentialClient(LOCAL_SERVER);

    const before_amount_raw = await essential.queryState(CONTRACT, ["0000000000000006"+"000000000000000"+wallet.toString()]);
    let before_amount = 0;
    if(before_amount_raw != null){
        before_amount = parseInt(before_amount_raw[0])
    }

    console.log("ESS BAL: "+before_amount)

    return before_amount
}

//WALLET CAN NOT BE GREATER THAN 9
async function mint_usdc(wallet: number, mint_amount: number){
    let essential = new EssentialClient(LOCAL_SERVER);

    let mintLiqPro = {
        contract: CONTRACT,
        predicate:  MINT_USDC_PRED
    } as PredicateAddress

    const before_amount = await essential.queryState(CONTRACT, ["0000000000000005"+"0000000000000001"]);
    
    let to_add = 0;

    if(before_amount != null){
        to_add = before_amount[0]
    }

    let stateMut = {
        key: [5, wallet],
        value: [mint_amount+to_add]
    } as Mutation

    let solutionData = {
        predicate_to_solve: mintLiqPro,
        decision_variables: [[wallet], [mint_amount]],
        transient_data: [],
        state_mutations: [stateMut]
    } as SolutionData

    let solution = new Solution([solutionData])
    let tx_hash = await essential.submitSolution(solution);

    await sleep(8000)

    const after_amount = await essential.queryState(CONTRACT, ["0000000000000005"+"0000000000000001"])
    return after_amount[0]
}

//WALLET CAN NOT BE GREATER THAN 9
async function mint_ess(wallet: number, mint_amount: number){
    let essential = new EssentialClient(LOCAL_SERVER);

    let addLiquidityPredicateAddress = {
        contract: CONTRACT,
        predicate:  MINT_ESS_PRED
    } as PredicateAddress

    const before_amount = await essential.queryState(CONTRACT, ["0000000000000006"+"0000000000000001"]);
    
    let to_add = 0;

    if(before_amount != null){
        to_add = before_amount[0]
    }

    let stateMut = {
        key: [6, wallet],
        value: [mint_amount+to_add]
    } as Mutation

    let solutionData = {
        predicate_to_solve: addLiquidityPredicateAddress,
        decision_variables: [[wallet], [mint_amount]],
        transient_data: [],
        state_mutations: [stateMut]
    } as SolutionData

    let solution = new Solution([solutionData])
    let tx_hash = await essential.submitSolution(solution);
    console.log(tx_hash)

    await sleep(8000)

    const after_amount = await essential.queryState(CONTRACT, ["0000000000000006"+"0000000000000001"])
    return after_amount[0]
}

async function get_reserve_usdc(){
    let essential = new EssentialClient(LOCAL_SERVER);

    const raw = await essential.queryState(CONTRACT, ["0000000000000000"]);
    let amount = 0;
    if(raw != null){
        amount = parseInt(raw[0])
    }
    return amount
}

async function get_reserve_ess(){
    let essential = new EssentialClient(LOCAL_SERVER);

    const raw = await essential.queryState(CONTRACT, ["0000000000000001"]);
    let amount = 0;
    if(raw != null){
        amount = parseInt(raw[0])
    }
    return amount
}

//WALLET CANT BE GREATER THAN 9!!
async function lp_bal(wallet: number){
    let essential = new EssentialClient(LOCAL_SERVER);
    let lp_balance_after = 0;
    const lp_balance_after_raw = await essential.queryState(CONTRACT, ["0000000000000003" + "000000000000000"+wallet.toString()])
    if(lp_balance_after_raw != null){
        lp_balance_after = parseInt(lp_balance_after_raw[0])
    }
    return lp_balance_after
}

//WALLET CANT BE GREATER THAN 9!!
async function provide_liquidity(wallet: number, usdc_in: number, ess_in: number){
    let essential = new EssentialClient(LOCAL_SERVER);

    let lp_balance_before = 0
    const lp_balance_before_raw = await essential.queryState(CONTRACT, ["0000000000000003" + "000000000000000"+wallet.toString()])
    if(lp_balance_before_raw != null){
        lp_balance_before = parseInt(lp_balance_before_raw[0])
    }

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

    //DECISION & STATE
    let usdc_add = usdc_in; //standard 
    let ess_add = ess_in; //standard

    //STATE CHANGES
    let reserve_usdc = usdc_add + reserve_usdc_before // + old (i: 0)
    let reserve_ess = ess_add + reserve_ess_before// + old (i: 1)

    let nonce = 1; //mapping [wallet => this] (i: 4)
    let provider_usdc_balance = await usdc_bal(wallet) - usdc_add; //mapping [wallet => this] (i: 5)
    let provider_ess_balance = await ess_bal(wallet) - ess_add; //mapping [wallet => this] (i: 6)

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

    let solution = new Solution([solutionData])
    let tx_hash = await essential.submitSolution(solution);

    await sleep(8000)
    
    let lp_balance_after = 0;
    const lp_balance_after_raw = await essential.queryState(CONTRACT, ["0000000000000003" + "000000000000000"+wallet.toString()])
    if(lp_balance_after_raw != null){
        lp_balance_after = parseInt(lp_balance_after_raw[0])
    }

    return lp_balance_after - lp_balance_before
}

// which_token 1 for USDC, 0 for Ess
async function calc_out_from_in(which_token: number, input_amount: number){
    //STATE CHANGES
    let reserve_usdc = await get_reserve_usdc()
    let reserve_ess = await get_reserve_ess()

    //More Decision Declaration
    let amount_out = 0;
    if (which_token == 1){
        amount_out = Math.floor((input_amount * reserve_ess) / (reserve_usdc + input_amount))
    }
    else{
        amount_out = Math.floor((input_amount * reserve_usdc) / (reserve_ess + input_amount))
    }
    return amount_out;
}

test("provide liq from func", async () => {
    let wallet = 1;
    let usdc_amount = 1000;
    let ess_amount = 40000;


    let usdc_minted = await mint_usdc(wallet, usdc_amount)
    let ess_minted = await mint_ess(wallet, ess_amount)

    let usdc_reserves = await get_reserve_usdc();
    let ess_reserves = await get_reserve_ess();

    console.log("Ess: "+ess_minted);
    console.log("USDC:: "+usdc_minted);

    console.log("USDC Reserves: "+usdc_reserves);
    console.log("Ess Reserves: "+ess_reserves);

    let provided = await provide_liquidity(wallet, usdc_minted, ess_minted)

    let real = await lp_bal(wallet);

    let usdc_bal_ = await usdc_bal(wallet)
    let ess_bal_ = await ess_bal(wallet)

    usdc_reserves = await get_reserve_usdc();
    ess_reserves = await get_reserve_ess();

    console.log("USDC Reserves: "+usdc_reserves);
    console.log("Ess Reserves: "+ess_reserves);

    console.log("Ess: "+usdc_bal_);
    console.log("USDC:: "+ess_bal_);

    console.log("LP Bal: "+real);

    expect(provided).toBe(real);
})


test('test mint from func', async () => {
    let amount = await mint_usdc(1, 100000)
    expect(await usdc_bal(1)).toBe(amount)
})

test('test mint from func', async () => {
    let amount = await mint_ess(1, 100)
    expect(await ess_bal(1)).toBe(amount)
})

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
        predicate:  MINT_ESS_PRED
    } as PredicateAddress


    let wallet = 1 //Wallet 0
    let mint_amount = 503;

    const before_amount = await essential.queryState(CONTRACT, ["0000000000000006"+"0000000000000001"]);
    
    let to_add = 0;

    if(before_amount != null){
        to_add = before_amount[0]
    }

    console.log(to_add);

    let stateMut = {
        key: [6, wallet],
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

    const after_amount = await essential.queryState(CONTRACT, ["0000000000000006"+"0000000000000001"])
    console.log("After: "+after_amount)
    expect(after_amount).toEqual([mint_amount+to_add])
}, 1000000);

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
    let provider_usdc_balance = await usdc_bal(wallet) - usdc_add; //mapping [wallet => this] (i: 5)
    let provider_ess_balance = await ess_bal(wallet) - ess_add; //mapping [wallet => this] (i: 6)

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

// which_token: 1 for USDC, 0 for Ess  
async function swap(wallet: number, which_token: number){
    let essential = new EssentialClient(LOCAL_SERVER);
    
    let swapAddrs = {
        contract: CONTRACT,
        predicate:  SWAP_PRED
    } as PredicateAddress

    //Ensure there is liquidity in the pool
    let usdc_amount = 1000;
    let ess_amount = 40000;
    let usdc_minted = await mint_usdc(wallet, usdc_amount)
    let ess_minted = await mint_ess(wallet, ess_amount)
    let usdc_reserves = await get_reserve_usdc();
    let ess_reserves = await get_reserve_ess();
    let provided = await provide_liquidity(wallet, usdc_minted, ess_minted)

    //Ensure user has token
    await mint_usdc(wallet, usdc_amount)
    await mint_ess(wallet, ess_amount)

    //DECISION & STATE
    let user = wallet;
    let amount_in = 30;
    let token_in = which_token; // 1 for USDC, 0 for Ess
    let min_amount_out = 0;


    //STATE CHANGES
    let reserve_usdc = await get_reserve_usdc()
    let reserve_ess = await get_reserve_ess()
    let user_usdc_bal = await usdc_bal(wallet);
    let user_ess_bal = await ess_bal(wallet);

    //More Decision Declaration
    let amount_out = await calc_out_from_in(token_in, amount_in)
    // constraint amount_out == cond {
    //     token_in => (amount_in * reserve_ess) / (reserve_usdc + amount_in),
    //     else => (amount_in * reserve_usdc) / (reserve_ess + amount_in),
    // };

    //DESCISION VARIABLES
    let decision_variables = [
        [user],
        [amount_in],
        [token_in],
        [min_amount_out],
        [amount_out]
    ]

    let new_reserve_usdc = token_in ? reserve_usdc + amount_in : reserve_usdc - amount_out
    let new_reserve_ess = token_in ? reserve_ess - amount_out : reserve_ess + amount_in
    let new_user_usdc_bal = token_in ? user_usdc_bal - amount_in : user_usdc_bal + amount_out
    let new_user_ess_bal = token_in ? user_ess_bal  + amount_out : user_ess_bal - amount_in

    let stateMuts = [
        {
            key: [0],
            value: [new_reserve_usdc]
        },
        {
            key: [1],
            value: [new_reserve_ess]
        },
        {
            key: [5, user],
            value: [new_user_usdc_bal]
        },
        {
            key: [6, user],
            value: [new_user_ess_bal]
        }  
    ] as Mutation[]
    
    let solutionData = {
        predicate_to_solve: swapAddrs,
        decision_variables: decision_variables,
        transient_data: [],
        state_mutations: stateMuts
    } as SolutionData

    let solution = new Solution([solutionData])
    let tx_hash = await essential.submitSolution(solution);
    console.log(tx_hash)

    await sleep(8000);

}

test('test swap from func', async () => {
    let wallet = 1;
    let which_token = 1
    let amount_in = 3

    //Ensure there is liquidity in the pool
    let usdc_amount = 1000;
    let ess_amount = 40000;
    let usdc_minted = await mint_usdc(wallet, usdc_amount)
    let ess_minted = await mint_ess(wallet, ess_amount)
    let provided = await provide_liquidity(wallet, usdc_minted, ess_minted)

    //Ensure user has token
    await mint_usdc(wallet, usdc_amount)
    await mint_ess(wallet, ess_amount)

    let reserve_usdc = await get_reserve_usdc()
    let reserve_ess = await get_reserve_ess()
    let user_usdc_bal = await usdc_bal(wallet);
    let user_ess_bal = await ess_bal(wallet);

    //More Decision Declaration
    let amount_out = await calc_out_from_in(which_token, amount_in)

    let new_reserve_usdc = which_token ? reserve_usdc + amount_in : reserve_usdc - amount_out
    let new_reserve_ess = which_token ? reserve_ess - amount_out : reserve_ess + amount_in
    let new_user_usdc_bal = which_token ? user_usdc_bal - amount_in : user_usdc_bal + amount_out
    let new_user_ess_bal = which_token ? user_ess_bal  + amount_out : user_ess_bal - amount_in

    await swap(wallet, 1)

    const validated_user_usdc_bal = await usdc_bal(wallet);

    console.log("Gotten: "+validated_user_usdc_bal);
    console.log("Set: "+new_user_usdc_bal);

    expect(validated_user_usdc_bal).toBe(new_user_usdc_bal);

}, 1000000);


test('test swap!!!', async () => {
    let essential = new EssentialClient(LOCAL_SERVER);
    

    let swapAddrs = {
        contract: CONTRACT,
        predicate:  SWAP_PRED
    } as PredicateAddress

    let wallet = 1 //Wallet 0


    //Ensure there is liquidity in the pool
    let usdc_amount = 1000;
    let ess_amount = 40000;
    let usdc_minted = await mint_usdc(wallet, usdc_amount)
    let ess_minted = await mint_ess(wallet, ess_amount)
    let usdc_reserves = await get_reserve_usdc();
    let ess_reserves = await get_reserve_ess();
    let provided = await provide_liquidity(wallet, usdc_minted, ess_minted)

    //Ensure user has token
    await mint_usdc(wallet, usdc_amount)
    await mint_ess(wallet, ess_amount)

    //DECISION & STATE
    let user = wallet;
    let amount_in = 30;
    let token_in = 1; // 1 for USDC, 0 for Ess
    let min_amount_out = 0;


    //STATE CHANGES
    let reserve_usdc = await get_reserve_usdc()
    let reserve_ess = await get_reserve_ess()
    let user_usdc_bal = await usdc_bal(wallet);
    let user_ess_bal = await ess_bal(wallet);

    console.log("Incoming State: ")
    console.log("USDC Reserves: "+reserve_usdc)
    console.log("Ess Reserves: "+reserve_ess)
    console.log("USDC Bal: "+user_usdc_bal)
    console.log("Ess Bal: "+user_ess_bal)

    //More Decision Declaration
    let amount_out = await calc_out_from_in(token_in, amount_in)

    console.log("Amount In:"+amount_in);
    console.log("Amount Out:"+amount_out);
    // constraint amount_out == cond {
    //     token_in => (amount_in * reserve_ess) / (reserve_usdc + amount_in),
    //     else => (amount_in * reserve_usdc) / (reserve_ess + amount_in),
    // };

    //DESCISION VARIABLES
    let decision_variables = [
        [user],
        [amount_in],
        [token_in],
        [min_amount_out],
        [amount_out]
    ]

    let new_reserve_usdc = token_in ? reserve_usdc + amount_in : reserve_usdc - amount_out
    let new_reserve_ess = token_in ? reserve_ess - amount_out : reserve_ess + amount_in
    let new_user_usdc_bal = token_in ? user_usdc_bal - amount_in : user_usdc_bal + amount_out
    let new_user_ess_bal = token_in ? user_ess_bal  + amount_out : user_ess_bal - amount_in

    let stateMuts = [
        {
            key: [0],
            value: [new_reserve_usdc]
        },
        {
            key: [1],
            value: [new_reserve_ess]
        },
        {
            key: [5, user],
            value: [new_user_usdc_bal]
        },
        {
            key: [6, user],
            value: [new_user_ess_bal]
        }  
    ] as Mutation[]
    
    let solutionData = {
        predicate_to_solve: swapAddrs,
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

    const validated_user_usdc_bal = await usdc_bal(user);

    console.log("Gotten: "+validated_user_usdc_bal);
    console.log("Set: "+new_user_usdc_bal);

    expect(validated_user_usdc_bal).toBe(new_user_usdc_bal);


    // const reserve_usdc_after = await essential.queryState(CONTRACT, ["0000000000000000"])
    // expect(reserve_usdc_after).toEqual([reserve_usdc])
    
    // const reserve_ess_after = await essential.queryState(CONTRACT, ["0000000000000001"])
    // expect(reserve_ess_after).toEqual([reserve_ess])

    // const lp_balance_after = await essential.queryState(CONTRACT, ["0000000000000003" + "0000000000000001"])
    // expect(lp_balance_after).toEqual([lp_total])

    // const total_supply_lp_after = await essential.queryState(CONTRACT, ["0000000000000002"])
    // expect(total_supply_lp_after).toEqual([total_supply_lp])

    // const nonce_after = await essential.queryState(CONTRACT, ["0000000000000004" + "0000000000000001"])
    // expect(nonce_after).toEqual([nonce])
    
    // const provider_usdc_balance_after = await essential.queryState(CONTRACT, ["0000000000000005" + "0000000000000001"])
    // expect(provider_usdc_balance_after).toEqual([provider_usdc_balance])

    // const provider_ess_balance_after = await essential.queryState(CONTRACT, ["0000000000000006" + "0000000000000001"])
    // expect(provider_ess_balance_after).toEqual([provider_ess_balance])

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
