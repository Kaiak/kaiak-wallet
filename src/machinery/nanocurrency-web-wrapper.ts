import { block, tools } from 'nanocurrency-web';
import type { Frontier, NANO, NanoAddress, PrivateKey, RAW } from './models';
import type {
  SendBlock,
  SignedBlock,
  ReceiveBlock,
  RepresentativeBlock,
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

export function truncateNanoAddress(address: NanoAddress): string {
  return (
    address.substr(0, 9) +
    '.....' +
    address.substr(address.length - 5, address.length)
  );
}

export function signReceiveBlock(
  address: NanoAddress,
  privateKey: PrivateKey,
  workHash: string,
  frontier: Frontier,
  walletBalance: RAW,
  representative: NanoAddress,
  blockHash: string,
  amount: RAW
): SignedBlock {
  const data: ReceiveBlock = {
    walletBalanceRaw: walletBalance.raw,
    toAddress: address,
    transactionHash: blockHash,
    frontier: frontier,
    representativeAddress: representative,
    amountRaw: amount.raw,
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
  workHash: string,
  representative: NanoAddress
): SignedBlock {
  const data: SendBlock = {
    walletBalanceRaw: walletBalance.raw,
    fromAddress: fromAddress,
    toAddress: toAddress,
    representativeAddress: representative,
    frontier: frontier,
    amountRaw: amount.raw,
    work: workHash,
  };

  return block.send(data, privateKey);
}

export function signRepresentativeBlock(
  privateKey: PrivateKey,
  walletBalance: RAW,
  address: NanoAddress,
  representativeAddress: NanoAddress,
  frontier: string,
  workHash: string
): SignedBlock {
  const data: RepresentativeBlock = {
    walletBalanceRaw: walletBalance.raw,
    address: address,
    representativeAddress: representativeAddress,
    frontier: frontier,
    work: workHash,
  };

  return block.representative(data, privateKey);
}
