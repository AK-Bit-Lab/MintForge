import pkgTransactions from '@stacks/transactions';
const { makeSmartContractDeploy, broadcastTransaction, AnchorMode } = pkgTransactions;
import pkgNetwork from '@stacks/network';
const { STACKS_MAINNET } = pkgNetwork;
import pkgWallet from '@stacks/wallet-sdk';
const { generateWallet } = pkgWallet;
import fs from 'fs';

async function run() {
    // Load mnemonic from environment variable
    const mnemonic = process.env.DEPLOYMENT_MNEMONIC;
    
    if (!mnemonic) {
        throw new Error('DEPLOYMENT_MNEMONIC environment variable is not set. Please set it before running this script.');
    }

    const wallet = await generateWallet({
        secretKey: mnemonic,
        password: process.env.DEPLOYMENT_PASSWORD || 'password'
    });

    const account = wallet.accounts[0];
    const privateKey = account.stxPrivateKey;

    const codeBody = fs.readFileSync('./contracts/minimint-hub-v-i28.clar', 'utf8');

    const network = STACKS_MAINNET;

    // Get the proper nonce as Clarinet was failing to fetch it
    const infoUrl = `${network.coreApiUrl}/v2/accounts/${account.address}`;
    const response = await fetch(infoUrl);
    const accountInfo = await response.json();
    const nextNonce = accountInfo.nonce;

    console.log(`Current nonce from chain: ${nextNonce}`);

    const txOptions = {
        contractName: 'minimint-hub-v-i28',
        codeBody,
        senderKey: privateKey,
        network,
        fee: 200000n, // 0.2 STX
        nonce: nextNonce,
        clarityVersion: 2,
        anchorMode: AnchorMode.Any
    };

    const transaction = await makeSmartContractDeploy(txOptions);

    console.log("Broadcasting transaction...");
    const broadcastResponse = await broadcastTransaction(transaction, network);

    console.log(`Broadcast Response:`, broadcastResponse);
}

run().catch(console.error);
