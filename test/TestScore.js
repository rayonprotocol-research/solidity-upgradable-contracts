const Score = artifacts.require('./Score.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

var scoreContract;
contract('Score Test', function (accounts) {
    before(async function () {
        // Contract deploy
        scoreContract = await Score.new({ from: accounts[0] });
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
})