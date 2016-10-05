var exec = require('child_process').exec;

module.exports = function(robot) {
  robot.hear(/家計簿/i, function(msg){
  var text=msg["envelope"]["message"]["text"];
　 text=String(text);
　　msg.reply(text);
  var word = text.replaceAll("　", " ");
  mgs.reply(word);
  return;
  var word = text.replaceAll("　", " ").split(" ",0);
  var execS="python python/gas_home1.py getTest1 ";
  if (word.length==1){
    msg.reply("場所指定してください");
    return;
  }else if(word[1]=="食費"){
    execS+="eat";
    msg.reply("syoku");
  }else{
    execS+="etc";
    msg.reply("seikatu");
  }
  exec(execS, function (error, stdout, stderr) {
	    if(stdout){
		msg.reply(stdout);
		//console.log('stdout: ' + stdout);
	    }
	    if(stderr){
		msg.reply(stderr);
		//console.log('stderr: ' + stderr);
	    }
	    if (error !== null) {
		msg.reply(error);
	      //console.log('Exec error: ' + error);
	    }
	});
    });
}
