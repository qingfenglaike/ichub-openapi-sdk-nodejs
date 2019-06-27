const MAX_ENCRYPT_BLOCK = 117;
const MAX_DECRYPT_BLOCK = 128;
const crypto = require('crypto');
const fs = require('fs');

class Rsa {
    constructor(public_key, private_key) {
        this.public_key = public_key;
        this.private_key = private_key;
    }

    /**
     *  rsa私钥验签
     * @param prestr
     * @param sign
     * @returns {boolean}
     */
    privateRsaVerify(prestr, sign) {
        let private_pem = fs.readFileSync(this.private_key);
        let private_key = private_pem.toString();
        let result = this.rsa_decrypt(sign, private_key);
        if (result && result === prestr) {
            return true;
        }
        else {
            return false
        }
    };

    /**
     *公钥签名
     * @param content
     * @returns {string}
     */
    publicSign(content) {
        let public_pem = fs.readFileSync(this.public_key);
        let public_key = public_pem.toString();
        return this.rsa_encrypt(content, public_key)
    };

    /**
     * 根据签名获取签名字符串
     * @param sign
     * @returns {string}
     */
    signStr(sign) {
        let private_pem = fs.readFileSync(this.public_key);
        let private_key = private_pem.toString();
        return this.rsa_decrypt(sign, private_key);
    };

    /**
     * 根据签名获取签名字典
     * @param sign
     */
    signArr(sign) {
        let private_pem = fs.readFileSync(this.public_key);
        let private_key = private_pem.toString();
        let result = this.rsa_decrypt(sign, private_key);
        let res = {};
        if (result) {
            let arr = result.split('&');
            for (let index in arr) {
                let tmp = value.split('=');
                if (tmp.length === 2) {
                    res[tmp[0]] = tmp[1]
                }
            }
        }
        return res
    };

    /**
     * RSA公钥加密
     * @param prestr
     * @param public_key
     * @returns {string}
     */
    rsa_encrypt(prestr, public_key) {
        let buf = new Buffer.from(prestr, "utf-8");
        let inputLen = buf.byteLength;
        let bufs = [];
        let offSet = 0;
        let endOffSet = MAX_ENCRYPT_BLOCK;
        //分段加密
        while (inputLen - offSet > 0) {
            if (inputLen - offSet > MAX_ENCRYPT_BLOCK) {
                let bufTmp = buf.slice(offSet, endOffSet);
                bufs.push(crypto.publicEncrypt({key: public_key, padding: crypto.constants.RSA_PKCS1_PADDING}, bufTmp));
            } else {
                let bufTmp = buf.slice(offSet, inputLen);
                bufs.push(crypto.publicEncrypt({key: public_key, padding: crypto.constants.RSA_PKCS1_PADDING}, bufTmp));
            }
            offSet += MAX_ENCRYPT_BLOCK;
            endOffSet += MAX_ENCRYPT_BLOCK;
        }
        let result = Buffer.concat(bufs);
        return result.toString("base64");
    };

    /**
     *Rsa 私钥分段解密
     * @param sign_str
     * @param private_key
     * @returns {string}
     */
    rsa_decrypt(sign_str, private_key) {
        try {
            let buf = new Buffer.from(sign_str, "base64");
            let inputLen = buf.byteLength;
            let bufs = [];
            let offSet = 0;
            let endOffSet = MAX_DECRYPT_BLOCK;
            //分段解密
            while (inputLen - offSet > 0) {
                if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
                    let bufTmp = buf.slice(offSet, endOffSet);
                    bufs.push(crypto.privateDecrypt({
                        key: private_key,
                        padding: crypto.constants.RSA_PKCS1_PADDING
                    }, bufTmp));
                } else {
                    //let bufTmp = buf.slice(offSet, inputLen);
                    let bufTmp = buf;
                    bufs.push(crypto.privateDecrypt({
                        key: private_key,
                        padding: crypto.constants.RSA_PKCS1_PADDING
                    }, bufTmp));
                }
                offSet += MAX_DECRYPT_BLOCK;
                endOffSet += MAX_DECRYPT_BLOCK;
            }
            return Buffer.concat(bufs).toString();
        } catch (e) {
            console.log(e)
            return '';
        }

    }
}

module.exports = Rsa;

