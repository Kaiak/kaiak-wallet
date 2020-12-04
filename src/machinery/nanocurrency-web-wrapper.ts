import {block, tools} from "nanocurrency-web";
import type { NANO, NanoAddress, PrivateKey } from "./models";
import type {SignedBlock} from "nanocurrency-web/dist/lib/block-signer";


export function rawToNano(raw: number, fractions?: number): NANO {
    return {
        amount: Number.parseFloat(
            tools.convert(raw.toString(), 'RAW', 'NANO')
        ).toFixed(fractions)
    };
}

export function nanoToRaw(nano: NANO): number {
    return Number.parseFloat(tools.convert(nano.amount, 'NANO', 'RAW'))
}

export function signReceiveBlock(
    address: NanoAddress,
    privateKey: PrivateKey,
    workHash: string,
    pendingBlock: any,
    frontier: any,
    currentBalance: string
): SignedBlock {
    const blockHash = Object.keys(pendingBlock)[0];

    const amount = pendingBlock[blockHash].amount;

    const data = {
        walletBalanceRaw: currentBalance, // TODO
        toAddress: address,
        transactionHash: blockHash,
        frontier: frontier,
        representativeAddress: "nano_1hzoje373eapce4ses7xsx539suww5555hi9q8i8j7hpbayzxq4c4nn91hr8", // TODO
        amountRaw: amount,
        work: workHash
    };

    return block.receive(data, privateKey)
}
