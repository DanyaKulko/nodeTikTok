module.exports = async function (req, res) {

    let videoLink = req.body.video_url;
    let GeneralLink = videoLink;

    let checkMobile = ((videoLink.split("vm.tiktok.").length - 1) > 0);

    if (checkMobile) {
        await axios.get(videoLink).then(function (response) {
            GeneralLink = response.request.res.responseUrl;
        }).catch(function (no200) {
            console.error("404, 400, and other events");
        });
    }

    let _splitSlash = GeneralLink.split("/");
    let indetificator = _splitSlash[_splitSlash.length - 1].split(".")[0];

    console.log({indetificator})

    let data = `aweme_ids=%5B${indetificator}%5D`;

    let config = {
        method: 'post',
        url: 'https://api-h2.tiktokv.com/aweme/v1/multi/aweme/detail/',
        headers: {
            'Host': 'api-h2.tiktokv.com',
            'Accept-Encoding': 'gzip, deflate',
            'Passport-Sdk-Version': '19',
            'Sdk-Version': '2',
            'X-Vc-Bdturing-Sdk-Version': '2.1.0.i18n',
            'X-Tt-Dm-Status': 'login=1;ct=1',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length': '35',
            'User-Agent': 'okhttp/3.12.1'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            let videoLink = response.data.aweme_details[0].video.bit_rate[0].play_addr.url_list[0];
            let audioLink = response.data.aweme_details[0].music.play_url.url_list[0];

            // if(!videoLink || !audioLink)
            //     res.send({success: false})
            // else {
                res.send({
                    success: true,
                    videoLink: videoLink,
                    audioLink: audioLink
                });
            // }
        })
        .catch(function (error) {
            console.log(error);
            res.send({success: false});
        });
};