var exec = require('child_process').exec;
var share=require("./share.js");


module.exports = function(robot) {
  robot.hear(/(八百屋|福太郎)[ 　][0-9]+/i, function(msg){


    var text=msg["envelope"]["message"]["text"];
　   var text=String(text);
    var word=text.replace(/　/g," ");
    word = word.split(" ");
    var shop=""
    var cate="";
　　　 if(word[0]=="八百屋"){
      cate="食費";
      shop="八百屋";
    }else if(word[0]=="福太郎"){
      cate="生活費";
      shop="薬の福太郎";
    }
    execset(msg,cate,shop,word[1]);

  });
}


function execset(msg,category,shop,price){
  user = msg["envelope"]["user"]["name"];
  user=share.nMap(user);
  val=share.money(user);
  var execS="python python/gas_home2.py setTest1 "+category+" "+shop+" "+price+" "+user+" "+val+" "+share.lineO;

  execser(execS,msg);
　　return;

}

function execser(parameter,msg){

      exec(parameter, function (error, stdout, stderr) {
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
}


