const crypto = require('crypto');

const SECRET = 'PRUEBAS-API';

module.exports.random = () => crypto.randomBytes(128).toString('base64');
module.exports.authentication = (salt, password) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};