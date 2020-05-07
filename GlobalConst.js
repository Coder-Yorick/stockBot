require('dotenv').config()

const ENV = {
    PORT: process.env.PORT,
    LINE: {
        CHANNEL_ID: process.env.CHANNEL_ID,
        CHANNEL_SECRET: process.env.CHANNEL_SECRET,
        CHANNEL_ACCESS_TOKEN: process.env.CHANNEL_ACCESS_TOKEN,
        NOTIFTY_AUTH: process.env.NOTIFTY_AUTH
    },
    MYSQL: {
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_PORT: process.env.MYSQL_PORT,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PWD: process.env.MYSQL_PWD,
        MYSQL_DBNAME: process.env.MYSQL_DBNAME
    }
}

const GConst = {
    _VERSION: '1.0.0',
    DEVELOPERID: 'U7840e11a91ef2aa11c5033a44c20762c',
    TESTERIDS: [
        'U5dc421e1d531284fa5f7fe7d28446e6a', // Father
        'Uc6da919ef530d5f5c30c4a5e7a8fb5ac', // Mother
        'Ub3b0731bb4000cf3d024da472135d8e5', // Sister
        'U240b5fedca6a453e7d2e3ea0b7172ff5' // Wife
    ]
}

module.exports = { GConst, ENV };
