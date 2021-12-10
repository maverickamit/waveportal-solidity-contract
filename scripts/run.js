const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  //Compile it.
  const ProjectContractFactory = await hre.ethers.getContractFactory(
    "MyProjectContract"
  );
  //Deploy it.
  const ProjectContract = await ProjectContractFactory.deploy();
  //Wait for it to be deployed/mined.
  await ProjectContract.deployed();

  console.log("Contract has deployed!! Address:", ProjectContract.address);
  console.log("Contract deployed by:", owner.address);

  let waveCount;
  waveCount = await ProjectContract.getTotalWaves();
  console.log("Total Waves:", waveCount.toString());

  let waveTxn = await ProjectContract.wave("Some message from me.");
  await waveTxn.wait();

  waveCount = await ProjectContract.getTotalWaves();
  console.log("Total Waves:", waveCount.toString());

  //Waving by random person
  waveTxn = await ProjectContract.connect(randomPerson).wave(
    "Some message from random person."
  );
  await waveTxn.wait();
  let allWaves = await ProjectContract.getAllWaves();
  waveCount = await ProjectContract.getTotalWaves();
  console.log("Total Waves:", waveCount.toString());
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
