var crypto = require('crypto');

module.exports = function() {

  this.encrypt = function(string, password) {

    var encryptedString,
        cipher            = crypto.createCipher('aes192', password),
        cipherText        = cipher.update(string, 'utf8', 'binary');
    
    cipherText += cipher.final('binary');
    encryptedString = new Buffer(cipherText, 'binary').toString('base64');
    return encryptedString;

  };

  this.decrypt = function(string, password) {

    var cipherText  = new Buffer(string, 'base64').toString('binary'),
        decipher    = crypto.createDecipher('aes192', password),
        plainText   = decipher.update(cipherText, 'binary', 'utf8');

    plainText += decipher.final('utf8');
    return plainText;

  };

};