import { block, tools } from 'nanocurrency-web';
import type { Frontier, NANO, NanoAddress, PrivateKey } from './models';
import type {
  SendBlock,
  SignedBlock,
  ReceiveBlock,
} from 'nanocurrency-web/dist/lib/block-signer';

export function rawToNano(raw: number, fractions?: number): NANO {
  return {
    amount: Number.parseFloat(
      tools.convert(raw.toString(), 'RAW', 'NANO')
    ).toFixed(fractions),
  };
}

export function nanoToRaw(nano: NANO): string {
  return tools.convert(nano.amount, 'NANO', 'RAW');
}

export function signReceiveBlock(
  address: NanoAddress,
  privateKey: PrivateKey,
  workHash: string,
  pendingBlock: any,
  frontier: Frontier,
  walletBalance: NANO
): SignedBlock {
  const blockHash = Object.keys(pendingBlock)[0];

  const amount = pendingBlock[blockHash].amount;

  const data: ReceiveBlock = {
    walletBalanceRaw: nanoToRaw(walletBalance),
    toAddress: address,
    transactionHash: blockHash,
    frontier: frontier,
    representativeAddress:
      'nano_1hzoje373eapce4ses7xsx539suww5555hi9q8i8j7hpbayzxq4c4nn91hr8', // TODO
    amountRaw: amount,
    work: workHash,
  };

  return block.receive(data, privateKey);
}

export function signSendBlock(
  privateKey: PrivateKey,
  walletBalance: NANO,
  fromAddress: NanoAddress,
  toAddress: NanoAddress,
  frontier: string,
  amount: NANO,
  workHash: string
): SignedBlock {
  const data: SendBlock = {
    walletBalanceRaw: nanoToRaw(walletBalance),
    fromAddress: fromAddress,
    toAddress: toAddress,
    representativeAddress:
      'nano_1hzoje373eapce4ses7xsx539suww5555hi9q8i8j7hpbayzxq4c4nn91hr8', // TODO
    frontier: frontier,
    amountRaw: nanoToRaw(amount),
    work: workHash,
  };

  return block.send(data, privateKey);
}
