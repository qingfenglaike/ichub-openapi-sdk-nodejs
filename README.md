  /* "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "cleanLib": "./node_modules/.bin/rimraf lib",
     "bableBuild": "./node_modules/.bin/babel src --out-dir lib",
     "prepublish": "npm run cleanLib && npm run bableBuild",
     "build": "babel src --out-dir lib"
   },*/
   
   - npm install webpack --save-dev
   - npm install webpack-cli --save-dev
   - npm install babel-loader babel-core --save-dev
   - 安装babel-preset来指定编译的版本：npm install babel-preset-env --save-dev
   - npm install babel-plugin-transform-runtime --save
   - npm config set registry https://registry.npm.taobao.org
   
   - npm adduser 添加账号
   - npm login 登录
   - npm publish 发布
   - npm unpublish [--force] 不成功可以强制取消
   - 登录官网 https://www.npmjs.com/ 查看packagelist
