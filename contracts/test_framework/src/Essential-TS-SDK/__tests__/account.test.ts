import {Account} from "../src/account"

const TEST_PK_2 = "c38054d31d73c5bd625c23737ced43be34165ccb8bed322edba922db7558d283"
const RUST_PUB_SHORT = "022f7eaa46c73d0cdaee478caca77a52f38a2f4b8f6082e66d5c0f1714ee6e4254"

test('Can Pub Key is Expected', async () => {
    let acc_1 = Account.from_str(TEST_PK_2)
    expect(acc_1.publicKey()).toBe(RUST_PUB_SHORT)
});
  