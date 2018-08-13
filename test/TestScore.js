const ScoreStore = artifacts.require('./ScoreStore.sol');
const ScoreV1 = artifacts.require('./ScoreV1.sol');
const ScoreV2 = artifacts.require('./ScoreV2.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

var scoreContract;
contract('Score Test', function (accounts) {
    before(async function () {
        // Contract deploy
        scoreStoreContract = await ScoreStore.new({ from: accounts[0] });
        scoreContract = await ScoreV1.new(scoreStoreContract.address, { from: accounts[0] });
        // change ownership of scoreStore
        scoreStoreContract.transferOwnership(scoreContract.address, { from: accounts[0] });
    })

    describe('Hit and get test', function () {
        it("test for accounts1", async function () {
            const account = accounts[1];

            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 10);

            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 20);

            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 30);
        })
        it("test for accounts2", async function () {
            const account = accounts[2];

            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 10);

            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 20);
        })
    })
    describe('Change score contract to ScoreV2', function () {
        it("deploy ScoreV2 contract", async function () {
            // before deploy ScoreV2, change ownership of scoreStore (reclaimStoreOwnership)
            await scoreContract.recliamStoreOwnership({ from: accounts[0] });

            // deploy ScoreV2
            scoreContract = await ScoreV2.new(scoreStoreContract.address, { from: accounts[0] });
            // change ownership of scoreStore
            scoreStoreContract.transferOwnership(scoreContract.address, { from: accounts[0] });
        })
        it("test for accounts1", async function () {
            const account = accounts[1];

            // score is maintained.
            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 50);

            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 70);

            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 90);
        })
        it("test for accounts2", async function () {
            const account = accounts[2];

            // score is maintained.
            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 40);

            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 60);
        })
    })
    describe('ScoreStore access of unauthorized accounts', function () {
        it("score contract access of accounts", async function () {
            assert.equal(await scoreContract.score({ from: accounts[1] }), 90);
            assert.equal(await scoreContract.score({ from: accounts[2] }), 60);
        })
        it("store contract access of accounts", async function () {
            await scoreStoreContract.get(accounts[1], { from: accounts[1] }).should.be.rejectedWith(/revert/);
            await scoreStoreContract.get(accounts[2], { from: accounts[2] }).should.be.rejectedWith(/revert/);
        })
    })
})