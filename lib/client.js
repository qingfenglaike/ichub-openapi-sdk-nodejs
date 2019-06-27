const request = require('./common/request/requestBase');
const models = require('./common/request/models');

class client {
    // constructor(self, v='1.0.0', app_id='', sign_type='', key='', public_key='', private_key=''){
    //     this.request = requestBase(v=v, app_id=app_id, sign_type=sign_type, key=key, public_key=public_key,
    //         private_key=private_key)
    // }
    constructor(url = '', v = '1.0.0', app_id = '', sign_type = '', key = '', public_key = '', private_key = '') {
        this.request = new request(url, v, app_id, sign_type, key, public_key, private_key);
    }

    setCallback(callback) {
        this.request.setCallback(callback)
    }

    /**
     *上传供货
     * @param currency_id
     * @param tax_rate
     * @param items
     * @returns {boolean|void}
     */
    uploadsupply(currency_id, tax_rate, items) {
        let data = {'api_code': models.supply, 'tax_rate': tax_rate, 'currency_id': currency_id, 'items': items};
        return this.request.send_request(data, ['items']);
    }
}

module.exports = client;