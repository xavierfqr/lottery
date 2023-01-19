import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Lottery', function () {
  async function deployBasicSendTransaction() {
    const AMOUNT_TO_SEND = 1 * 10 ** 18;

    const [owner, otherAccount] = await ethers.getSigners();

    const Lottery = await ethers.getContractFactory('Lottery');
    const lottery = await Lottery.deploy();
    await lottery.deployed();
  
    return { owner, lottery, AMOUNT_TO_SEND };
  }

  describe('Transaction', function () {
    it('Lottery balance should be equal to 1 (exact amount eth sent)', async function () {
      const { owner, lottery, AMOUNT_TO_SEND } = await loadFixture(deployBasicSendTransaction);

      await lottery.participate({value: ethers.utils.parseEther("1")});
      const lotteryBalance = await lottery.provider.getBalance(lottery.address);
      expect(lotteryBalance.toBigInt() >= AMOUNT_TO_SEND);
    });

    it('Lottery balance should be equal to 0 (not enough eth sent)', async function () {
      const { owner, lottery, AMOUNT_TO_SEND } = await loadFixture(deployBasicSendTransaction);

      try {
        await lottery.participate({value: ethers.utils.parseEther("0.5")});
      } catch (e) {
        const lotteryBalance = await lottery.provider.getBalance(lottery.address);
        expect(lotteryBalance.toBigInt() == BigInt(0));
      }
      expect(false);
    });

    it('Lottery balance should be equal to 0 (fund giveaway)', async function () {
      const { owner, lottery, AMOUNT_TO_SEND } = await loadFixture(deployBasicSendTransaction);

      await lottery.participate({value: ethers.utils.parseEther("1")});
      await lottery.giveAway();
      const lotteryBalance = await lottery.provider.getBalance(lottery.address);
      expect(lotteryBalance.toBigInt() == BigInt(0));
    });
  });

  describe('Participants', function () {
    it('Participants should be erased after giveaway', async function () {
      const { owner, lottery, AMOUNT_TO_SEND } = await loadFixture(deployBasicSendTransaction);

      await lottery.participate({value: ethers.utils.parseEther("1")});
      expect(lottery.participants.length == 1);
      await lottery.giveAway();
      expect(lottery.participants.length == 0);
    });
  });
});
