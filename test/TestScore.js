const ScoreV1 = artifacts.require('./ScoreV1.sol');
const ScoreV2 = artifacts.require('./ScoreV2.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

var scoreContract;
contract('Score Test', function (accounts) {
    before(async function () {
        // Contract deploy
        scoreContract = await ScoreV1.new({ from: accounts[0] });
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
            scoreContract = await ScoreV2.new({ from: accounts[0] });
        })
        it("test for accounts1", async function () {
            const account = accounts[1];

            // score is initialized.
            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 20);

            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 40);

            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 60);
        })
        it("test for accounts2", async function () {
            const account = accounts[2];

            // score is initialized.
            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 20);

            await scoreContract.hit({ from: account });
            assert.equal(await scoreContract.score({ from: account }), 40);
        })
    })
})