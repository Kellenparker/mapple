const { response } = require("express");
const s3 = require("aws-sdk/clients/s3"); // npm install aws-sdk
require("dotenv").config();

const numMaps = 3;

const getMap = async (req, res = response) => {
    var s3Bkt = new s3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_,
    });

    const MONTH = 11;
    const DAY = 21;
    var now = new Date();
    var start = new Date(now.getFullYear(), MONTH - 1, DAY - 1);
    
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = (Math.floor(diff / oneDay) % numMaps) + 1;

    var params = { Bucket: "geologicle", Key: `${day}/info.txt` };
    s3Bkt.getObject(params, function (err, data) {
        if (err) {
            console.log(err.message);
        } else {
            var data = Buffer.from(data.Body).toString("utf8");
            res.json({
                info: data.split(/\r?\n/),
                day: day,
                next: tomorrow,
            });
        }
    });
};

module.exports = {
    getMap,
};
