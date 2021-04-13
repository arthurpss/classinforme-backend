const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: process.env.AWS_DEFAULT_REGION});
const multerS3 = require('multer-s3')

const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "files", "uploads"));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName)
            })
        }
    }),
    s3: multerS3({
        s3: new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_DEFAULT_REGION
        }),
        bucket: process.env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString("hex")}-${file.originalname}`;

                cb(null, fileName);
            });
        },
    }),
};



module.exports = {
    dest: path.resolve(__dirname, "files", "uploads"),
    storage: storageTypes['local'],
    limits: {
        fileSize: MAX_SIZE_TWO_MEGABYTES,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpg',
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ]

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    }

};