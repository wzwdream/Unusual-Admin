import CryptoJS from 'crypto-js'
//十六位十六进制数作为密钥（秘钥为随机生成，必须与后端保持一致！）
// const key = CryptoJS.enc.Utf8.parse("J4ny0Ja678Y7P2so")
const key:any = CryptoJS.enc.Utf8.parse('18873AC2978EC7FA')
//十六位十六进制数作为密钥偏移量（秘钥为随机生成，必须与后端保持一致！）
// const iv = CryptoJS.enc.Utf8.parse('pTNorfvZW2UZJbd0')
const iv:any = CryptoJS.enc.Utf8.parse('4FE46BE1C4485C95')

/**
 * @description AES加密算法
 * @param data 需要被加密的数据
 * @returns {string} 密文
 */
export function encrypt(data:string):string {
    if (typeof data === 'object') {
        // 如果传入的data是json对象，先转义为json字符串
        try {
            data = JSON.stringify(data)
        } catch (error) {
            console.log('error:', error)
        }
    }
    // 统一将传入的字符串转成UTF8编码
    const dataHex:any = CryptoJS.enc.Utf8.parse(data) // 需要加密的数据
    const keyHex:any = CryptoJS.enc.Utf8.parse(key) // 秘钥
    const ivHex:any = CryptoJS.enc.Utf8.parse(iv) // 偏移量
    const encrypted = CryptoJS.AES.encrypt(dataHex, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC, // 加密模式
        padding: CryptoJS.pad.Pkcs7
    })
    // let encryptedVal = encrypted.ciphertext.toString()
    return encrypted.ciphertext.toString() //  返回加密后的值
}
