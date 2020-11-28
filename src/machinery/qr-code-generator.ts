import type {NanoAddress} from "./models";
import QRCode from 'qrcode';

export async function generate(address: NanoAddress): Promise<string> {
    return await QRCode.toDataURL(address);
}
