/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require('dotenv').config();
 require("@nomiclabs/hardhat-ethers");
 require("./scripts/deploy.js");
 require("./scripts/mint.js");
 require("@nomiclabs/hardhat-etherscan");
 
 const { ALCHEMY_KEY, ACCOUNT_PRIVATE_KEY, ETHERSCAN_API_KEY, POLYGAM_ALCHEMY_API_KEY } = process.env;
 
 module.exports = {
    solidity: "0.8.0",
    defaultNetwork: "rinkeby",
    networks: {
     hardhat: {},
     polygon: {
        url: `https://polygon-mumbai.g.alchemy.com/v2/${POLYGAM_ALCHEMY_API_KEY}`,
        accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
      },
     rinkeby: {
       url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_KEY}`,
       accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
     },
     ethereum: {
       chainId: 1,
       url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
       accounts: [`0x${ACCOUNT_PRIVATE_KEY}`]
     },
   },
   etherscan: {
     apiKey: ETHERSCAN_API_KEY,
   },
 }