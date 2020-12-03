import SecureLS from "secure-ls";
import { wallet } from 'nanocurrency-web'

interface AccountAlias {
    index: number,
    alias: string
}

export interface WalletData {
    seed: string,
    aliases: AccountAlias[]
}

export interface WalletResult {
    data: WalletData
    mnemonic: string
}

const WALLET_STORE = 'wallet_store';

export function unlockWallet(encryptionSecret: string): WalletData | undefined {
    let ls = new SecureLS({encodingType: 'aes', encryptionSecret: encryptionSecret})
    try {
        const data: any = ls.get(WALLET_STORE)
        if(data.seed && data.aliases) {
            return {
                seed: data.seed,
                aliases: data.aliases
            }
        } else {
            return undefined;
        }
    } catch (e) {
        console.log(e)
        return undefined
    }
}

export function generateWallet(): WalletResult {
    const w = wallet.generate()
    return {
        data: {
            seed: w.seed,
            aliases: []
        },
        mnemonic: w.mnemonic,
    }
}

export function storeWallet(walletData: WalletData, encryptionSecret: string): void {
    let ls = new SecureLS({encodingType: 'aes', encryptionSecret: encryptionSecret})
    ls.set(WALLET_STORE, walletData)
}
