import {EssentialClient} from "../src/Essential-TS-SDK/src/rest-client"
import {SolutionData, PredicateAddress, Mutation, Solution} from "../src/Essential-TS-SDK/src/solutions"

const LOCAL_SERVER = "https://bigbangblock.builders"

const COUNTER_CONTRACT = "1899743AA94972DDD137D039C2E670ADA63969ABF93191FA1A4506304D4033A2" 
const INCREMENT_PREDICATE = "355A12DCB600C302FFD5D69C4B7B79E60BA3C72DDA553B7D43F4C36CB7CC0948"

test('Can submit solution', async () => {
    let essential = new EssentialClient(LOCAL_SERVER);
    const data = await essential.queryState(COUNTER_CONTRACT, ["0000000000000000"]);
    let cur_count = parseInt(data[0])

    let predicateAddress = {
        contract: COUNTER_CONTRACT,
        predicate:  INCREMENT_PREDICATE
    } as PredicateAddress

    let stateMut = {
        key: [0],
        value: [cur_count + 1]
    } as Mutation

    let solutionData = {
        predicate_to_solve: predicateAddress,
        decision_variables: [],
        transient_data: [],
        state_mutations: [stateMut]
    } as SolutionData

    let solution = new Solution([solutionData])
    let tx_hash = await essential.submitSolution(solution);

    const new_data = await essential.queryState(COUNTER_CONTRACT, ["0000000000000000"]);
    let new_count = parseInt(new_data[0])

    console.log("Updated To: "+new_count)
    // console.log(data)
    //ToDo: Actual testing
});

test("", () => {
    console.log("test");
})
