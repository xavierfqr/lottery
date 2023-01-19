import { time, loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Lottery', function () {
  async function deployBasicSendTransaction() {
    const AMOUNT_TO_SEND = ethers.utils.parseEther("0.01");

    const [owner, account1, account2] = await ethers.getSigners();

    const Lottery = await ethers.getContractFactory('Lottery');
    const lottery = await Lottery.deploy();

    return { owner, account1, account2, lottery, AMOUNT_TO_SEND };
  }

  describe('Transaction', function () {
    it('Lottery balance should be equal to 1 (exact amount eth sent)', async function () {
      const { lottery, AMOUNT_TO_SEND } = await loadFixture(deployBasicSendTransaction);

      await lottery.participate({value: AMOUNT_TO_SEND});
      const lotteryBalance = await lottery.provider.getBalance(lottery.address);
      expect(ethers.utils.parseEther(lotteryBalance.toString())).to.gte(AMOUNT_TO_SEND);
    });

    it('Lottery balance should be equal to 0 (not enough eth sent)', async function () {
      const { lottery } = await loadFixture(deployBasicSendTransaction);

      try {
        await lottery.participate({value: ethers.utils.parseEther("0.5")});
      } catch (e) {
        const lotteryBalance = await lottery.provider.getBalance(lottery.address);
        expect(ethers.utils.parseEther(lotteryBalance.toString())).to.equal(ethers.utils.parseEther("0"));
      }
      expect(false);
    });

    it('Lottery balance should be equal to 0 (fund giveaway)', async function () {
      const { account1, account2, lottery, AMOUNT_TO_SEND } = await loadFixture(deployBasicSendTransaction);

      await lottery.connect(account1).participate({value: ethers.utils.parseEther("0.01")});
      await lottery.connect(account2).participate({value: ethers.utils.parseEther("0.01")});
      const winner = await lottery.lastWinner();
      const winnerBalance = await lottery.provider.getBalance(winner.toString());
      expect(winnerBalance).to.gt(ethers.utils.parseEther("10000"));
    });
  });

  describe('Participants', function () {
    it('Participants should be erased after giveaway', async function () {
      const { account1, account2, lottery } = await loadFixture(deployBasicSendTransaction);

      await lottery.connect(account1).participate({value: ethers.utils.parseEther("0.01")});
      let nbParticipants = await lottery.getParticipantsCount();
      expect(nbParticipants).to.equal(1);
      
      await lottery.connect(account2).participate({value: ethers.utils.parseEther("0.01")});
      nbParticipants = await lottery.getParticipantsCount();
      expect(nbParticipants).to.equal(0);
    });
  });
});
