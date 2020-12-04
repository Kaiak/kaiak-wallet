import CryptoJS from "crypto-js"
import SecureStorage from 'secure-web-storage'

export function storage(SECRET_KEY: string): SecureStorage {
    return new SecureStorage(localStorage, {
        hash: function hash(key) {
            key = CryptoJS.SHA256(key, SECRET_KEY);

            return key.toString();
        },
        encrypt: function encrypt(data) {
            data = CryptoJS.AES.encrypt(data, SECRET_KEY);

            data = data.toString();

            return data;
        },
        decrypt: function decrypt(data) {
            data = CryptoJS.AES.decrypt(data, SECRET_KEY);

            data = data.toString(CryptoJS.enc.Utf8);

            return data;
        }
    });
}
