var http = require('http');
var url = require('url');
var util = require('util');
var fs = require('fs');
var path = require("path");
var router = require('./fileRoute');
var probe = require('./probe')
var pagePath = "/index.html"


router.setRootPath(__dirname);

router.get('/', function(req, res){
    // 文件首页
    router.sendFile(res, pagePath);
});
console.log(process.argv)
var port = process.argv[2] || 8080;
probe(port, function(enabled, _pt){
    // 端口被占用 enabled 返回false
    // _pt：传入的端口号
    if(enabled !== true) {
        _pt += 10
    }
    const srv = http.createServer((req, res) => {
        router.init(req, res);
    })
    
    // 监听端口
    srv.listen(_pt);
    console.log('connect to : http://localhost:'+ _pt);
    
})
