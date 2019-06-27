const MD5 = require('./Md5');
const Rsa = require('./Rsa');

const fs = require("fs");

const SIGN_TYPE_MD5 = 'MD5';
const SIGN_TYPE_RSA = 'RSA';

class signUtil {
    /**
     *
     * @param sign_type
     * @param key
     * @param public_key
     * @param private_key
     * @returns {boolean}
     */
    constructor(sign_type = SIGN_TYPE_MD5, key = '', public_key = '', private_key = '') {
        if (sign_type !== SIGN_TYPE_MD5 && sign_type !== SIGN_TYPE_RSA) {
            console.log('sign_type invalid');
            process.exit()
        }
        if (sign_type === SIGN_TYPE_RSA) {
            if (public_key === '' || private_key === '') {
                console.log('public_key and private_key not empty')
                process.exit()
            }
            if (!this.fileExist(public_key)) {
                console.log('public_key file not exists');
                process.exit()
            }
            if (!this.fileExist(private_key)) {
                console.log('private_key file not exists');
                process.exit()
            }
        }
        this.sign_type = sign_type;
        this.key = key;
        this.public_key = public_key;
        this.private_key = private_key;
    }

    /**
     *过滤不需要签名的字段
     * @param para_temp
     * @returns {*}
     */
    paraFilter(para_temp) {
        let para_filter = {};
        for (let i in para_temp) {
            if (i === "sign" || i === "sign_type" || para_temp[i] === "") {
                continue;
            }
            para_filter[i] = para_temp[i];
        }
        return para_filter
    };

    /**
     * 字典排序
     * @param para_filter
     * @returns {*}
     */
    argSort(para_filter) {
        let res = '';
        let keys = Object.keys(para_filter);
        keys = keys.sort();
        for (let i in keys) {
            res += keys[i] + '=' + para_filter[keys[i]] + '&';
        }
        return res.substr(0, res.length - 1);
    }

    buildRequestMysign(para_temp) {
        let para_filter = this.paraFilter(para_temp);
        let prestr = this.argSort(para_filter);
        prestr = prestr + "&" + this.key;
        let mysign = '';
        if (this.sign_type === SIGN_TYPE_MD5) {
            let md5 = new MD5();
            mysign = md5.md5Sign(prestr)
        }
        else {
            let rsa = new Rsa(this.public_key, this.private_key);
            mysign = rsa.publicSign(prestr);
        }
        return mysign;
    }

    /**
     *获取验签结果
     * @param para_temp
     * @param sign
     * @returns {boolean}
     */
    getSignVeryfy(para_temp, sign) {
        let para_filter = this.paraFilter(para_temp);
        let prestr = this.argSort(para_filter);
        prestr = prestr + "&" + this.key;
        let sign_result = false;
        if (this.sign_type === SIGN_TYPE_MD5) {
            let md5 = new MD5();
            sign_result = md5.md5Verify(prestr, sign)
        }
        else {
            let rsa = new Rsa(this.public_key, this.private_key);
            sign_result = rsa.privateRsaVerify(prestr, sign);
        }
        return sign_result
    }

    fileExist(path) {
        try {
            fs.accessSync(path, fs.F_OK);
        } catch (e) {
            return false;
        }
        return true;
    }
}

module.exports = signUtil;


