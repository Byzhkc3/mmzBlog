var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

// 连接mysql数据库
var conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'blog',
	charset:'UTF8_GENERAL_CI'
});
conn.connect();

// 加载静态文件
app.use(express.static('public'));

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 访问首页时加载的页面
app.get('/',function(req,res){
	res.sendFile('index.html');
});

// post获取请求
app.post('/contactApi',function(req,res){
	console.log(req.body);
	// 返回json数据
	res.json({
		code:200,
		data:{
			msg:'成功提交数据'
		}
	});

	var dateTime = new Date().getTime();

	// 获取请求数据
	var res = req.body;
	var post  = {
		content: res.content,
		email:res.email,
		dateline:res.dateline,
		name:res.name
	};
	// 数据库插入
	conn.query('INSERT INTO contact SET ?',post,
		function(err, result) {
	  	console.log('数据插入成功'+' '+dateTime);
	});
	// conn.end();
	
});

// 处理404
app.use(function(req,res,next){
	res.status(404).send('抱歉，没有该页面！');
});

// 服务监听
var server = app.listen(8080,function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('正在监听',host,port);
	console.log('服务器地址:http://localhost:'+ port);
});