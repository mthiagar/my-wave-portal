const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    // using ethersjs to compile contract, generate files to work with contract
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // create temp local ethereum network, destroy when script completes.
    const waveContract = await waveContractFactory.deploy();
    // wait until contract is deployed on blockchain, then run constructor during deployment
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();