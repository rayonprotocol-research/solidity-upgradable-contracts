const ScoreV1 = artifacts.require('./ScoreV1.sol');
const ScoreV2 = artifacts.require('./ScoreV2.sol');
const ScoreInterface = artifacts.require("ScoreInterface.sol");
const Proxy = artifacts.require("Proxy.sol")

require('chai')
    .use(require('chai-as-promised'))
    .should();

var scoreContract;
var proxy;
var scoreInterface;
contract('Score Test', function (accounts) {
    before(async function () {
        // Score contract(ScoreV1) deploy
        scoreContract = await ScoreV1.new({ from: accounts[0] });

        // Proxy setting
        proxy = await Proxy.new(scoreContract.address, { from: accounts[0] });
        scoreInterface = await ScoreInterface.at(proxy.address, { from: accounts[0] });
    })

    describe('Hit and get test', function () {
        it("test for accounts1", async function () {
            const account = accounts[1];

            await scoreInterface.hit({ from: account });
            assert.equal(await scoreInterface.score({ from: account }), 10);

            await scoreInterface.hit({ from: account });
            assert.equal(await scoreInterface.score({ from: account }), 20);

            await scoreInterface.hit({ from: account });
            assert.equal(await scoreInterface.score({ from: account }), 30);
        })
        it("test for accounts2", async function () {
            const account = accounts[2];

            await scoreInterface.hit({ from: account });
            assert.equal(await scoreInterface.score({ from: account }), 10);

            await scoreInterface.hit({ from: account });
            assert.equal(await scoreInterface.score({ from: account }), 20);
        })
    })
    describe('Change score contract to ScoreV2', function () {
        it("deploy ScoreV2 contract", async function () {
            // deploy ScoreV2
            scoreContract = await ScoreV2.new({ from: accounts[0] });

            // change target contract of Score in proxy
            await proxy.setTargetAddress(scoreContract.address, { from: accounts[0] });
        })
        it("test for accounts1", async function () {
            const account = accounts[1];

            // score is maintained.
            await scoreInterface.hit({ from: account });
            assert.equal(await scoreInterface.score({ from: account }), 50);

            await scoreInterface.hit({ from: account });
            assert.equal(await scoreInterface.score({ from: account }), 70);

            await scoreInterface.hit({ from: account });
            assert.equal(await scoreInterface.score({ from: account }), 90);
        })
        it("test for accounts2", async function () {
            const account = accounts[2];

            // score is maintained.
            await scoreInterface.hit({ from: account });
            assert.equal(await scoreInterface.score({ from: account }), 40);

            await scoreInterface.hit({ from: account });
            assert.equal(await scoreInterface.score({ from: account }), 60);
        })
    })
})