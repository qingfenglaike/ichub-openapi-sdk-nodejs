'use strict';

const crypto = require('crypto');

class MD5 {
    /**
     *MD5
     * @param prestr
     * @returns {string}
     */
    md5Sign(prestr) {
        let md5 = crypto.createHash("md5");
        md5.update(prestr);
        return md5.digest('hex');
    };

    /**
     * 签名校验
     * @param prestr
     * @param sign
     * @returns {boolean}
     */
    md5Verify(prestr, sign) {
        let md5 = crypto.createHash("md5");
        md5.update(prestr);
        let mysign = md5.digest('hex');
        if (sign === mysign) {
            return true;
        }
        return false;
    }
}

module.exports = MD5;
