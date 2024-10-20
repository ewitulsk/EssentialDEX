## Contracts
Each contracts folder has a contract written in Pint. To get familiar with Pint, here is a guide on some key concepts: https://essential-contributions.github.io/essential-integration/index.html
https://essential-contributions.github.io/pint/book/the-book-of-pint.html

## Getting Started
These are the following steps to run the test of a contract.

1. Go into a contract's pint directory i.e (ess/pint) and build the contract with `pint build`. The output is a unique hash of the contract and its predicates.
2. Update `contract.test.ts` in the `test_framework` directory. Update hash value for `CONTRACT`. Similarly, update the hash for the predicate.
3. The private key is a locally generated key used for testing purposes. Generate a new private key with `cargo install essential-wallet`. Installation instructions here: https://essential-contributions.github.io/essential-integration/getting-started/installation/source.html
4. Deploy the Pint contract to testnet `essential-rest-client --node-address "https://bigbangblock.builders/" --builder-address "https://bigbangblock.builders/" deploy-contract out/debug/contracts.json` 
Install the web client: https://essential-contributions.github.io/essential-integration/getting-started/installation/source.html#install-essential-rest-client.
Make sure the command outputs a hash to make sure broadcasting the contract was successful.
5. Inside `test_framework`, run `yarn run test __tests__/contract.test.ts`
