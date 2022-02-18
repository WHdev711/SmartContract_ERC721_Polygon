const { getContractFactory } = require("@nomiclabs/hardhat-ethers/types");
const { ethers, Contract } = require("ethers");
const { getContractAt } = require("@nomiclabs/hardhat-ethers/internal/helpers");

// Helper method for fetching environment variables from .env
function getEnvVariable(key, defaultValue) {
    if (process.env[key]) {
        return process.env[key];
    }
    if (!defaultValue) {
        throw `${key} is not defined and no default value was provided`;
    }
    return defaultValue;
}

// Helper method for fetching  a connection provider to the Ehtereum network
function getProvider() {
    return ethers.getDefaultProvider(getEnvVariable("NETWORKPOLYGON", "polygon"), {
        alchemy: getEnvVariable("POLYGAM_ALCHEMY_API_KEY"),
    });
}

// Helper method for fetching a wallet account using an environment variable for the PK
function getAccount() {
    return new ethers.Wallet(getEnvVariable("ACCOUNT_PRIVATE_KEY"),getProvider());
}

// Helper method for fetching a contract instance  at a given address
async function getContract(contractName, hre) {
    const account = await hre.ethers.getSigner();
    return getContractAt(hre, contractName, getEnvVariable("NFT_CONTRACT_ADDRESS"), account);
}

module.exports = { 
    getEnvVariable,
    getProvider,
    getAccount,
    getContract,
}