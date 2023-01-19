import { ethers } from 'hardhat';

async function main() {
  const [owner] = await ethers.getSigners();

  const Lottery = await ethers.getContractFactory('Lottery');
  const lottery = await Lottery.deploy();
  await lottery.deployed();

  console.log('lottery address:', lottery.address);
  console.log('lottery owner:', owner.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
