import CryptoJS from 'crypto-js'

const key:any = CryptoJS.enc.Utf8.parse('18873AC2978EC7FA')
const iv:any  = CryptoJS.enc.Utf8.parse('4FE46BE1C4485C95')

/**
 * @description AES解密算法
 * @param data 密文
 * @returns {string} 原文
 */
export function decrypt(data:string) {
    const encryptedHexStr:any = CryptoJS.enc.Hex.parse(data);
    const srcs:any = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const keyHex:any = CryptoJS.enc.Utf8.parse(key) // 秘钥
    const ivHex:any = CryptoJS.enc.Utf8.parse(iv) // 偏移量
    const decrypt:any = CryptoJS.AES.decrypt(srcs, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
