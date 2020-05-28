/* 图片上传 */
var express = require('express');
var app = express();
var fs = require("fs");
 
var bodyParser = require('body-parser');
var multer  = require('multer');
 console.log("===================",__dirname);
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
const upload = multer({ dest: '/tmp/'});
//app.use(upload);
 
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
 
app.post('/file_upload',upload.single('file'), function (req, res) {
    console.log('req=',req.body)
   console.log('files=',req.file);  // 上传的文件信息
 
   var des_file = __dirname + "/" + req.file.originalname;
   fs.readFile( req.file.path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.file.originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})
 
var server = app.listen(3000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})