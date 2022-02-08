const { task } = require("hardhat/config");
const { getAccount } = require("./helpers");


task("check-balance", "Current Account Balance").setAction(async function (taskArguments, hre) {
    // const account = getAccount();
    const [account] = await ethers.getSigners();
    console.log(`Account balance for ${account.address}: ${await account.getBalance()}`);
});

task("deploy", "Deploys the smart contract").setAction(async function (taskArguments, hre) {
    const nftContractFactory = await ethers.getContractFactory("NFT");
    const nft = await nftContractFactory.deploy();
    console.log(`Contract deployed to address: ${nft.address}`);
});