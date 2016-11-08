var express = require("express");
var app = express();
var multer = require('multer');
var storage = multer.diskStorage({
   destination: function(req, file, cb) {
      cb(null, 'uploads/');
   },
   filename: function(req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
   }
});

var upload = multer({
   storage: storage
});

app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
   res.render("index.html");
});
app.post('/get_file_size', upload.single("img"), function(req, res, next) {
   res.send({
      size: req.file.size
   });
});
app.listen(8080);