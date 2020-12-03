import SecureLS from "secure-ls";

interface AccountAlias {
    index: number,
    alias: string
}

export interface WalletData {
    seed: string,
    aliases: AccountAlias[]
}

export function unlockWallet(encryptionSecret: string): WalletData | undefined {
    let ls = new SecureLS({encodingType: 'aes', encryptionSecret: encryptionSecret})
    const data: any = ls.get('wallet_store')
    if(data.seed && data.aliases) {
        return {
            seed: data.seed,
            aliases: data.aliases
        }
    } else {
        return undefined;
    }
}
