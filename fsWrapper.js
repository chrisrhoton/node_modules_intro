var fs = require('fs');
var uid = require('./uid');

module.exports = function() {

  this.write = function(name, data, overwrite, callback){

    if(overwrite) {
      return fs.writeFileSync(name, data);
    }

    var buffer = new Buffer(data);

    fs.open(name, 'wx', function(err, fd) {
      var file,
          filename;

      if(err) {
        filename = uid() + name;
        console.log("File collision...creating new file named " + filename);
        file = fs.openSync(filename, 'w');
      }
      else {
        console.log("Writing to file " + name);
        file = fd;
      }

      fs.write(file, buffer, 0, buffer.length, null, function(err2, written, newBuffer) {
        console.log("Success!  File written.");
      });

    });

  };

  this.createFile = function(name, data, callback) {
    var filename    = name || "default.txt",
        dataToWrite = data || "";
    
    console.log("Writing file...");

    var stream = fs.writeFile(filename, dataToWrite, function(err) {
      if(err) throw err;
      console.log("File written!");
      if(callback) {
        callback();
      }
    });

  };

  this.appendToFile = function(name, data, callback) {

    var filename    = name || "default.txt",
        dataToWrite = data || "";

    console.log("Append to " + filename);

    fs.appendFile(filename, dataToWrite, function(err) {
      if(err) throw err;
      console.log("Data appended to " + filename);

      if(callback) {
        callback();
      }
    }); 

  };

  this.printToConsole = function(name) {

    var filename = name || "./default.txt";

    var filestream = fs.readFile(filename, function(err, data) {
      console.log(data.toString());
    });

  };

  this.copy = function(source, destination) {

    var sourceStream = fs.createReadStream(source),
        destStream   = fs.createWriteStream(destination);

    sourceStream.pipe(destStream);

  };

  this.move = function(source, destination) {

    fs.rename(source, destination, function() {

      console.log("Moved it!");

    });

  };

}