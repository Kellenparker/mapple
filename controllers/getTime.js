const { response } = require("express");
const request = require('request');

const getTime = async (req, res = response) => {
    console.log("here");
    request("https://www.timeapi.io/api/Time/current/zone?timeZone=America/Chicago", function(err, r, dat){
        let time = JSON.parse(dat);
        res.send({
            time: time.dateTime,
        });
    });
};

module.exports = {
    getTime,
};