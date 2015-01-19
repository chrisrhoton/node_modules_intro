// var Enc         = require('./cryptoWrapper'),
//     encoder     = new Enc(),
//     cipherText  = encoder.encrypt('Stuff!!!', 'password'),
//     plainText   = encoder.decrypt(cipherText, 'password');

// console.log("Ciphertext: " + cipherText);
// console.log("Plaintext: " + plainText);


var FS         = require('./fsWrapper'),
    filesystem = new FS();

filesystem.createFile("test.txt", "This is a test!");
filesystem.copy("test.txt", "newFile.txt");

filesystem.move("newFile.txt", "what.txt");

