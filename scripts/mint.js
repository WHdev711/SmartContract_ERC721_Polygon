const { task } =  require("hardhat/config");
const { getContract } = require("./helpers");
const  fetch  = require("node-fetch");

task("mint", "Mints from the NFT contract")
.addParam("address", "The address to receive a token")
.setAction(async function (taskArguments, hre) {
    console.log(taskArguments);
    const contract =  await getContract("NFT", hre);
    const transactionResponse = await contract.mintTo(taskArguments.address, {
        gasLimit:500_000,
    });
    console.log(`Transacton Hash: ${transactionResponse.hash}`);
});

// mint with metadata token uri
task("set-base-token-uri", "Sets the base token URI for the deployed smart contract")
.addParam("baseUrl", "The base of the TokenURI endpoint to set")
.setAction(async function (taskArguments, hre) {
    const contract = await getContract("NFT", hre);
    const transactionResponse = await contract.setBaseTokenURI(taskArguments.baseUrl, {
        gasLimit:500_000,
    });
    console.log(`Transaction Hash: ${transactionResponse.hash}`)
});

task("token-uri","Fetches the token metadata for the given token ID")
.addParam("tokenid", "The tokenId to fetch metadata for")
.setAction(async function(taskArguments, hre) {
    const contract = await getContract("NFT", hre);
    const response = await contract.tokenURI(taskArguments.tokenid, {
        gasLimit: 500_000,
    });
    const metadata_url = response;
    console.log(`Metadata URL: ${metadata_url} `);

    const metadata =  await fetch(metadata_url).then(res => res.json());
    console.log(`Metadata fetch response: ${JSON.stringify(metadata, null, 2)}`)
})

task("withdraw", "Withdraw from the NFT contract")
.setAction(async function (taskArguments, hre) {
    console.log(taskArguments);
    const contract =  await getContract("NFT", hre);
    const transactionResponse = await contract.withdraw({
        gasLimit:500_000,
    });
    console.log(`Transacton Hash: ${transactionResponse.hash}`);
});


task("getlist", "Withdraw from the NFT contract")
.setAction(async function (taskArguments, hre) {
    console.log(taskArguments);
    const contract =  await getContract("NFT", hre);
    const transactionResponse = await contract.getmintaddress({
        gasLimit:500_000,
    });
    console.log(`Transacton Hash: ${transactionResponse}`);
});