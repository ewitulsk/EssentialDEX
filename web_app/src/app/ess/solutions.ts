
export type Word = number; //i64 (maybe u64?)
export type Key = Word[];
export type Value = Word[]; 

export type Hash = String;  
export type ContentAddress = Hash; 

export type PredicateAddress = {
    contract: ContentAddress;
    predicate: ContentAddress;
};

export type SolutionData = {
    predicate_to_solve: PredicateAddress;
    decision_variables: Value[];
    transient_data: Mutation[];
    state_mutations: Mutation[];
};

export type Mutation = {
    key: Key;
    value: Value;
};

export class Solution {
    data: SolutionData[];

    constructor(_data: SolutionData[]){
        this.data = _data
    }

    stateMutationsLen(data: SolutionData[]): number {
        return data.reduce((sum, d) => sum + d.state_mutations.length, 0);
    }
    
    transientDataLen(data: SolutionData[]): number {
        return data.reduce((sum, d) => sum + d.transient_data.length, 0);
    }

    toObject(){
        return {
            data: this.data
        }
    }

    serialize() {
        let jsn = JSON.stringify(this.toObject());
        return jsn
    }
}
