const linebot = require('linebot');
const express = require('express');

/* Utility*/
const LineUtils = require('./LineUtils.js');
const { GConst, ENV } = require('./GlobalConst.js');

/* Library*/
const UserSessionPool = require('./UserSessionPool.js');

/* linebot setting*/
const bot = linebot({
    channelId: ENV.LINE.CHANNEL_ID,
    channelSecret: ENV.LINE.CHANNEL_SECRET,
    channelAccessToken: ENV.LINE.CHANNEL_ACCESS_TOKEN
});
const SERVER_PORT = ENV.PORT;

/* global variables*/
var userPool = new UserSessionPool();

/* service event */
const app = express();
const linebotParser = bot.parser();
app.post('/linewebhook', linebotParser);

app.get('/', function (req, res) {
    res.send(`小幫手啟動中(${GConst._VERSION})`);
});

app.listen(SERVER_PORT || 80, function () {
    console.log('LineBot is running.');
    try {
        bot.push(GConst.DEVELOPERID, ['小幫手啟動搂～\n現在版本為' + GConst._VERSION + '版～', {
            type: 'sticker',
            packageId: 2,
            stickerId: 144
        }]);
    } catch (e) {
        console.log(e.message);
    }
});

/* bot event */
bot.on('message', function (event) {
    let userID = LineUtils.GetSourceUserID(event.source);
    let msg = LineUtils.ParseMessageText(event.message);
    userPool.Update(userID, msg)
        .then(msg => {
            event.reply(msg);
        })
        .catch(err => {
            if (err != null)
                console.error(err);
        });
});

bot.on('postback', function (event) {
    let userID = LineUtils.GetSourceUserID(event.source);
    let msg = LineUtils.ParsePostbackText(event.postback);
    userPool.Update(userID, msg)
        .then(msg => {
            event.reply(msg);
        })
        .catch(err => {
            if (err != null)
                console.error(err);
        });
});

bot.on('join', function (event) {
    let groupID = MyLib.GetSourceUserID(event.source);
    bot.push(groupID, {
        type: 'sticker',
        packageId: 2,
        stickerId: 34
    });
    event.reply('大家好~');
});

bot.on('leave', function (event) {
    console.log(event);
});

bot.on('follow', function (event) {
    try {
        let userID = LineUtils.GetSourceUserID(event.source);
        LineUtils.GetSourceUserProfile(event.source)
            .then(profile => {
                if (profile != null) {
                    bot.push(GConst.DEVELOPERID, ['UserID:\n' + userID + '\n' + profile.displayName + '\n加你的小幫手好友摟～', {
                        type: 'sticker',
                        packageId: 2,
                        stickerId: 100
                    }]);
                }
            })
            .catch(e => {
                bot.push(GConst.DEVELOPERID, ['UserID:\n' + userID + '\n(取得profile失敗)\n加你的小幫手好友摟～', {
                    type: 'sticker',
                    packageId: 2,
                    stickerId: 100
                }]);
            });
    } catch (e) {
        console.log(e);
    }
});

bot.on('unfollow', function (event) {
    console.log(event);
});