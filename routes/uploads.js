
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Upload = require('../app/models/upload');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

router.get('/:uuid/:filename', function (req, res, next) {
    console.log(req.params.filename);
    Upload.findOne({
        'file.filename': req.params.uuid,
        'file.originalname': req.params.filename
    }, function (err, upload) {

        if (err) next(err);
        else {
            res.set({
                "Content-Disposition": 'attachment; filename="' + upload.file.originalname + '"',
                "Content-Type": upload.file.mimetype
            });
            fs.createReadStream(upload.file.path).pipe(res);
        }
    });
});


router.post('/', upload.single('image'), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
    var newUpload = {
        name: req.body.name,
        description: req.body.description,
        created: Date.now(),
        file: req.file
    };
    Upload.create(newUpload, function (err, next) {
        if (err) {
            next(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
