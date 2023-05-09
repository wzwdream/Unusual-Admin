import { enc, AES, mode, pad } from 'crypto-js'

// 十六位十六进制数密钥（秘钥必须与后端秘钥保持一致！）
const key = enc.Utf8.parse('18873AC2978EC7FA') // 秘钥
// 十六位十六进制数密钥偏移量
const iv = enc.Utf8.parse('4FE46BE1C4485C95') // 偏移量

/**
 * 加密算法
 * @param data 待加密的数据
 * @returns {string} 密文
 */
export function encrypt(data: string | object): string {
    if (typeof data === 'object') {
        // 如果传入的data是json对象，先转义为json字符串
        try {
            data = JSON.stringify(data)
        } catch (error) {
            console.log('error:', error)
        }
    }
    // 统一将传入的字符串转成UTF8编码
    const dataHex = enc.Utf8.parse(data as string) // 需要加密的数据
    const encrypted = AES.encrypt(dataHex, key, {
        iv,
        mode: mode.CBC, // 加密模式
        padding: pad.Pkcs7
    })
    return encrypted.ciphertext.toString() // 返回加密后的值
}
/**
 * 解密算法
 * @param data 待解密的数据
 * @returns {string} 明文
 */
export function decrypt(data: string): string {
    if (typeof data !== 'string' || !data) return data
    const encryptedHexStr = enc.Hex.parse(data)
    const srcs = enc.Base64.stringify(encryptedHexStr)
    const decrypt = AES.decrypt(srcs, key, {
        iv,
        mode: mode.CBC,
        padding: pad.Pkcs7
    })
    const decryptedStr = decrypt.toString(enc.Utf8)
    return decryptedStr.toString()
}
