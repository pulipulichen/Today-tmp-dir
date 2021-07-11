const exec = require('child_process').exec

module.exports = function (cmd) {
 return new Promise((resolve, reject) => {
  exec(cmd, (error, stdout, stderr) => {
   if (error) {
    //console.warn(error);
    return reject(error)
   }
   resolve(stdout? stdout : stderr);
  });
 });
}