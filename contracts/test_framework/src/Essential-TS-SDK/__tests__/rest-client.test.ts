import {EssentialClient} from "../src/rest-client"
import {SolutionData, PredicateAddress, Mutation, Solution} from "../src/solutions"
import { fromHexString } from "../src/utils"

const LOCAL_SERVER = "https://bigbangblock.builders"

const COUNTER_CONTRACT = "1899743AA94972DDD137D039C2E670ADA63969ABF93191FA1A4506304D4033A2" //Replace with your own deployment
const INCREMENT_PREDICATE = "355A12DCB600C302FFD5D69C4B7B79E60BA3C72DDA553B7D43F4C36CB7CC0948" //Replace with your own deployment

test('Can call get contracts', async () => {
    // let essential = new EssentialClient(LOCAL_SERVER)
    // const data = await essential.getContracts(COUNTER_CONTRACT);
    // console.log(data)
    //ToDo: Actual testing
  });

test('Can query state', async () => {
    let essential = new EssentialClient(LOCAL_SERVER);
    const data = await essential.queryState(COUNTER_CONTRACT, ["0000000000000000"]);
    console.log(data);
});
  

test('Can call list contracts', async () => {
    let essential = new EssentialClient(LOCAL_SERVER)
    const data = await essential.listContracts(1);
    // console.log("Data:" + data)
    //ToDo: Actual testing
});

test('Can call list predicates', async () => {
    let essential = new EssentialClient(LOCAL_SERVER)

    const data = await essential.getPredicate({
        contract: COUNTER_CONTRACT,
        predicate: INCREMENT_PREDICATE
    });

    console.log("Pred:")
    console.log(data)
    //ToDo: Actual testing
});

// test('Can submit solution', async () => {
//     console.log("Starting Submit")
//     let essential = new EssentialClient(LOCAL_SERVER)

//     let predicateAddress = {
//         contract: COUNTER_CONTRACT,
//         predicate:  INCREMENT_PREDICATE
//     } as PredicateAddress

    
    
//     let i = 0;
//     while(i < 100000){
//         let stateMut = {
//             key: [0],
//             value: [1022 + i]
//         } as Mutation
    
//         let solutionData = {
//             predicate_to_solve: predicateAddress,
//             decision_variables: [],
//             transient_data: [],
//             state_mutations: [stateMut]
//         } as SolutionData
    
//         let solution = new Solution([solutionData])
//         await essential.submitSolution(solution);
//         i++
//     }

//     // console.log(data)
//     //ToDo: Actual testing
// });

