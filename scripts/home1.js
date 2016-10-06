var exec = require('child_process').exec;
var share=require("./share.js");




module.exports = function(robot) {
  robot.hear(/家計簿/i, function(msg){
    var text=msg["envelope"]["message"]["text"];
　   var text=String(text);
   　var word=text.replace(/　/g," ");
    word = word.split(" ");
    if (word.length==1){
      msg.reply("続く言葉を指定してください");
    }else if (word.length==2){
      var val=share.pMap(word[1]);
      if(val==null){
        msg.reply("その項目は未実装です");
　　  　　　　return;
      }
　　  　　var execS="python python/gas_home2.py getTest "+val;
      execser(execS,msg);

　   }else if (word.length==5){
      //登録を実施 
      var execS="python python/gas_home2.py setTest1 ";
 
      //クレジットの場合は、入れ替える。word3とword4かな
      val=share.money(word[4]);
      if(val==2){
        execS+=word[1]+" "+word[2]+" "+word[3]+" "+word[4];
      }
      else{
        execS+=word[1]+" "+word[2]+" "+word[4]+" "+word[3];
      }
      execS+=" "+val+" "+share.lineO;

      execser(execS,msg);
    }else{
      msg.reply("未実装");
    }
  
    return;
  });

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


