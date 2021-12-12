const { ethers } = require("ethers");

const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  //Compile it.
  const ProjectContractFactory = await hre.ethers.getContractFactory(
    "MyProjectContract"
  );
  //Deploy it.
  const ProjectContract = await ProjectContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });
  //Wait for it to be deployed/mined.
  await ProjectContract.deployed();

  console.log("Contract has deployed!! Address:", ProjectContract.address);
  console.log("Contract deployed by:", owner.address);

  //Get the contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    ProjectContract.address
  );
  console.log(
    "Contract Balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );

  //Get total waves
  let waveCount;
  waveCount = await ProjectContract.getTotalWaves();
  console.log("Total Waves:", waveCount.toString());

  //Send wave
  let waveTxn = await ProjectContract.wave("Some message from me.");
  await waveTxn.wait();

  //Get total waves
  waveCount = await ProjectContract.getTotalWaves();
  console.log("Total Waves:", waveCount.toString());

  //Get the contract balance
  contractBalance = await hre.ethers.provider.getBalance(
    ProjectContract.address
  );
  console.log(
    "Contract Balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );

  //Send wave
  waveTxn = await ProjectContract.wave("Some message from me.");
  await waveTxn.wait();

  //Waving by random person
  waveTxn = await ProjectContract.connect(randomPerson).wave(
    "Some message from random person."
  );
  await waveTxn.wait();

  let allWaves = await ProjectContract.getAllWaves();

  //Get total waves
  waveCount = await ProjectContract.getTotalWaves();
  console.log("Total Waves:", waveCount.toString());

  //Get the contract balance
  contractBalance = await hre.ethers.provider.getBalance(
    ProjectContract.address
  );
  console.log(
    "Contract Balance: ",
    hre.ethers.utils.formatEther(contractBalance)
  );
  console.log(allWaves);
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
