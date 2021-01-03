import { block, tools } from 'nanocurrency-web';
import type { Frontier, NANO, NanoAddress, PrivateKey, RAW } from './models';
import type {
  SendBlock,
  SignedBlock,
  ReceiveBlock,
} from 'nanocurrency-web/dist/lib/block-signer';

function round(number: number, places: number): number {
  return +(Math.round(Number(number + 'e+' + places)) + 'e-' + places);
}

/** Used for displaying RAW as NANO */
export function rawToNano(raw: RAW, fractions: number): NANO {
  return {
    amount: round(
      Number(tools.convert(raw.raw, 'RAW', 'NANO')),
      fractions
    ).toString(),
  };
}

export function nanoToRaw(nano: NANO): RAW {
  return {
    raw: tools.convert(nano.amount, 'NANO', 'RAW'),
  };
}

export function signReceiveBlock(
  address: NanoAddress,
  privateKey: PrivateKey,
  workHash: string,
  pendingBlock: any,
  frontier: Frontier,
  walletBalance: RAW
): SignedBlock {
  const blockHash = Object.keys(pendingBlock)[0];

  const amount = pendingBlock[blockHash].amount;

  const data: ReceiveBlock = {
    walletBalanceRaw: walletBalance.raw,
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
  walletBalance: RAW,
  fromAddress: NanoAddress,
  toAddress: NanoAddress,
  frontier: string,
  amount: RAW,
  workHash: string
): SignedBlock {
  const data: SendBlock = {
    walletBalanceRaw: walletBalance.raw,
    fromAddress: fromAddress,
    toAddress: toAddress,
    representativeAddress:
      'nano_1hzoje373eapce4ses7xsx539suww5555hi9q8i8j7hpbayzxq4c4nn91hr8', // TODO
    frontier: frontier,
    amountRaw: amount.raw,
    work: workHash,
  };

  return block.send(data, privateKey);
}
