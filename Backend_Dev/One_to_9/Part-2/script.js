const fs = require('fs');

// writeFiles
fs.writeFile('hey.txt', "hey hello kaise ho", function(err) {
    if (err) console.error(err);
    else console.log("File created successfully!");
});

// appendFiles
fs.appendFile('hey.txt', '  main to achha hu', function(err) {
    if (err) console.error(err);
    else console.log("Content appended successfully!");
});

// rename
fs.rename("hey.txt", "hello.txt", function(err) {
    if (err) console.error(err);
    else console.log("File renamed successfully!");
});

// copyFiles

fs.copyFile("hello.txt","./copy/chacha.txt", function(err) {
    if (err) console.error(err);
    else console.log("File copyfiles successfully!");
});

// unlink files
fs.unlink("hello.txt", function(err) {
    if (err) console.error(err);
    else console.log("File removes successfully!");
});

// rmdir()

fs.rmdir( "./copy", function(err) {
    if (err) console.error(err);
    else console.log("File removes successfully!");
});
//  same

fs.rm( "./copy",{recursive:true}, function(err) {
    if (err) console.error(err);
    else console.log("File removes successfully!");
});