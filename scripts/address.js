
const { task } =  require("hardhat/config");
const { getContract } = require("./helpers");

task("getmintaddress", "Withdraw from the NFT contract")
.setAction(async function (taskArguments, hre) {
    console.log(taskArguments);
    const contract =  await getContract("NFT", hre);
    const transactionResponse = await contract.getmintaddress( {
        gasLimit:500_000,
    });
    console.log(`Transacton Hash: ${transactionResponse.hash}`);
});