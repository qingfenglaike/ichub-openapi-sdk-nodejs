const request = require('request');
const signUtil = require('../sign/signUtil');
const util = require('util');

class requestBase {
    constructor(url = '', v = '1.0.0', app_id = '', sign_type = '', key = '', public_key = '', private_key = '') {
        this.url = (url !== '' ? url : 'https://open.ichub.com');
        this.v = v;
        this.app_id = app_id;
        this.sign_type = sign_type;
        this.verify = new signUtil(sign_type, key, public_key, private_key)
    }

    setCallback(callback) {
        this.callback = callback;
    }

    send_request(params = {}, filter_param = []) {
        params['timestamp'] = Date.parse(new Date());
        params['v'] = this.v;
        params['app_id'] = this.app_id;
        params['sign_type'] = this.sign_type;
        let sign_param = Object.assign({}, params);

        if (filter_param.length > 0) {
            for (let i in filter_param) {
                delete sign_param[filter_param[i]];
            }
        }
        params['sign'] = this.verify.buildRequestMysign(sign_param);
        try {
            const getPromise = util.promisify(request.post);
            getPromise({url: this.url, form: params}).then((value) => {
                if (this.callback !== undefined) {
                    this.callback(value);
                } else {
                    console.log(value)
                }
            }).catch((err) => {
                console.log("err", err);
                return false;
            });
            // request.post({url: this.url, form: params}, function (err, httpResponse, body) {
            //     if (this.callback !== undefined) {
            //         this.callback(err, httpResponse, body);
            //     } else {
            //         console.log(err);
            //         console.log(httpResponse);
            //         console.log(body)
            //     }
            // });
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }


    }
}

module.exports = requestBase;