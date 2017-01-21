var https = require("https");
var crypto = require("crypto");
var url = require("url");
var access_key = "f073a6b0-56ef7b55-24c0414e-76702";
var secret_key = "8169fd91-09a6e47a-8caee13a-c840f";
var api_url = "https://api.huobi.com/";

var method = "get_account_info";
var created = "" + new Date().getTime();
var params = "method=" + method;
params = params + "&access_key=" + access_key;
params = params + "&created=" + created.substr(0,10);
var md5 = crypto.createHash('md5');
md5.update("access_key=" + access_key + "&created=" + new Date().getTime() + "&method=" + method + "&secret_key=" + secret_key);
var sign = md5.digest('hex');
params = params + "&sign=" + sign;
params = params + "&market=cny";
console.log(url.resolve(api_url,"apiv3?" + params));

var options = {
  hostname: 'api.huobi.com',
  port: 443,
  path: '/apiv3?' + params,
  method: 'POST'
};

var req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();
