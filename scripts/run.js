const main = async () => {
  //Compile it.
  const ProjectContractFactory = await hre.ethers.getContractFactory(
    "MyProjectContract"
  );
  //Deploy it.
  const ProjectContract = await ProjectContractFactory.deploy();
  //Wait for it to be deployed/mined.
  await ProjectContract.deployed();
  console.log("Contract has deployed!! Address:", ProjectContract.address);

  let waveTxn = await ProjectContract.wave();
  await waveTxn.wait();
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
