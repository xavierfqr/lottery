import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Lottery', function () {
  async function deployBasicSendTransaction() {
    const AMOUNT_TO_SEND = ethers.utils.parseEther("0.01");

    const [owner, otherAccount] = await ethers.getSigners();

    const Lottery = await ethers.getContractFactory('Lottery');
    const lottery = await Lottery.deploy();

    return { owner, otherAccount, lottery, AMOUNT_TO_SEND };
  }

  describe('Transaction', function () {
    it('Lottery balance should be equal to 0.01 (exact amount eth sent)', async function () {
      const { lottery, AMOUNT_TO_SEND } = await loadFixture(deployBasicSendTransaction);

      await lottery.participate({value: AMOUNT_TO_SEND});
      const lotteryBalance = await lottery.provider.getBalance(lottery.address);
      expect(ethers.utils.parseEther(lotteryBalance.toString()) >= AMOUNT_TO_SEND);
    });

    it('Lottery balance should be equal to 0 (not enough eth sent)', async function () {
      const { lottery } = await loadFixture(deployBasicSendTransaction);

      try {
        await lottery.participate({value: ethers.utils.parseEther("0.001")});
      } catch (e) {
        const lotteryBalance = await lottery.provider.getBalance(lottery.address);
        expect(ethers.utils.parseEther(lotteryBalance.toString()) == ethers.utils.parseEther("0"));
      }
      expect(false);
    });

    it('Lottery balance should be equal to 0 (fund giveaway)', async function () {
      const { owner, otherAccount, lottery, AMOUNT_TO_SEND } = await loadFixture(deployBasicSendTransaction);

      await lottery.participate({value: ethers.utils.parseEther("0.01")});
      await lottery.connect(otherAccount).participate({value: ethers.utils.parseEther("0.01")});
      const winner = await lottery.lastWinner();
      const winnerBalance = await lottery.provider.getBalance(winner.toString());
      console.log(winnerBalance.toString())
      expect(ethers.utils.parseEther(winnerBalance.toString()) == ethers.utils.parseEther("0"));
    });
  });

  describe('Participants', function () {
    it('Participants should be erased after giveaway', async function () {
      const { otherAccount, lottery } = await loadFixture(deployBasicSendTransaction);

      await lottery.participate({value: ethers.utils.parseEther("0.01")});
      expect(lottery.participants.length == 1);
      await lottery.connect(otherAccount).participate({value: ethers.utils.parseEther("0.01")});
      expect(lottery.participants.length == 0);
    });
  });
});
