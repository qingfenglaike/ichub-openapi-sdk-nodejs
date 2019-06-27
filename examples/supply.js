const client = require('../lib/client');
let app_id = '4d7a6d8828a8bf7ec48195c6f7e81a88';
let app_key = '123456';
let sign_type = "MD5";
let v = '1.0.0';
let url = 'http://opendev.ichub.com/router/rest';
let items = [
    {
        'sku': '111',
        'brand': '厂牌',
        'datecode': '2014+',
        'quality': '1',
        'date_of_delivery': '',
        'moq': 1,
        'coo': '',
        'product_qty': 1,
        'price_unit': '20.00',
        'price_interval': '1:10;2:8;',
        'description': '',
        'product_code': ''
    },
];

let ichubClient = new client(host = url, v, app_id, sign_type, app_key);
ichubClient.setCallback(callback);
ichubClient.uploadsupply("R", 1.11, items);

//请求完回调
function callback(params) {
    console.log(JSON.parse(params.body));
    console.log(params.statusCode);
}