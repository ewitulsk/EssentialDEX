import {EssentialClient} from "./rest-client"
import {SolutionData, PredicateAddress, Mutation, Solution, Word, Value} from "./solutions"

const LOCAL_SERVER = "https://bigbangblock.builders"

const CONTRACT = "F790ACCA0B90D4E33288429D7539CE542E10F75D0A2197BE5F47CEFD9F420C91"
const MINT_USDC_PRED = "5F3A37CDA561A8B40870DB8758711FD668E2FD9551453056B88031E2607EB463"
const MINT_ESS_PRED = "AA1C297BFECED97CD4D3F69AEE869FABAE1764DCF7796B5C46B04CAC66682062"
const ADD_LIQ_PRED = "A366B03643862475A71709883E0A3065E93A28CE23C44A3CA85CAB854E62D330"
const SWAP_PRED = "396A67524E015070AD12203646B44DC39FA761A82BB1C69DCF61CBBD7E953DC9"


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

    // let essential = new EssentialClient(LOCAL_SERVER);
    // let lp_balance_after = 0;
    // const lp_balance_after_raw = await essential.queryState(CONTRACT, ["0000000000000003" + "000000000000000"+wallet.toString()])
    // if(lp_balance_after_raw != null){
    //     lp_balance_after = parseInt(lp_balance_after_raw[0])
    // }

    let lp_balance_after = 726526
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


export { usdc_bal, ess_bal, mint_usdc, mint_ess, get_reserve_usdc, get_reserve_ess, lp_bal, provide_liquidity }
