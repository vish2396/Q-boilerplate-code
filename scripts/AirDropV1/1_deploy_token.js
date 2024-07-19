// Import necessary modules
const { ethers, upgrades } = require("hardhat");
Web3 = require('web3');

// Asynchronous function to deploy QRC20 token
async function main() {
    
    // Set metadata for the QRC20 token
    const name = "Meta DAO";
    const symbol = "Meta";
    const decimals = 18; // or any other value you want
    const contractURI = "";
    const resource = "QRC20_RESOURCE";
    const totalSupplyCap = Web3.utils.toWei('1000000000', 'ether');

    // Display deployment message
    console.log("Deploying QRC20");

    // Get the QRC20 contract factory
    const QRC20 = await ethers.getContractFactory("QRC20");

    // Deploy an upgradeable QRC20 contract using the factory
    const qrc = await upgrades.deployProxy(QRC20, [name,symbol,decimals,contractURI,resource,totalSupplyCap], {initializer:"initialize", kind: "transparent"});

    // Wait for the deployment process to complete
    await qrc.waitForDeployment();

    // Get the address of the deployed QRC20 contract
    const qrc20Address = await qrc.getAddress();

    // Log the deployment address
    console.log("QRC20 deployed to:", qrc20Address);
}

// Call the main function to deploy the QRC20 token
main();
