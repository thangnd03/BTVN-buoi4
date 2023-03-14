var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.filepath; // đường dẫn cũ
            var newpath = 'C:/Users/Dell/uploads/' + files.filetoupload.originalFilename; // đường dẫn mới
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved');
                res.end();
            }); // đổi đường dẫn file vừa up
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);