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
	  if (word[1]=="ヘルプ"){
		  helpmessage(msg);
          return;
	  }
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
    }else if(word.length==3){
      	if(word[1]=="ヘルプ"&&word[2]=="ショートカット"){
      		helpmessage2(msg);
		}else if(word[1]=="入金"){
			var execS="python python/gas_home2.py setIncome "+word[2]+" ";
		    user = msg["envelope"]["user"]["name"];
		    user=share.nMap(user);
			row=share.inMoney(user);
			col=share.inMoneyCol;
			execS+=row+" "+col;
			execser(execS,msg);
		}
		else if(word[1]=="削除" &&(word[2]=="現金"||word[2]=="クレジット"||word[2]=="入金")){
	
			if(word[2]=="入金"){
				
			}
			else{
				 var execS="python python/gas_home2.py delete1 ";
				 var col=share.money(word[2]);
				 var row=share.lineO;
				 execS+=col+" "+row;
				 execser(execS,msg);
			}
			
		}
      	else{
      		msg.reply("未実装");
      	}
    
    }else{
      msg.reply("未実装");
    }
  
    return;
  });

}

function helpmessage2(msg){
  msg.reply("現在のところ、これらは先頭に「家計簿」と書く必要もありません");
  msg.reply("八百屋 金額 =>食費、八百屋、現金、入力者、として補完");
  msg.reply("福太郎 金額 =>生活費、福太郎　現金　入力者、として補完");
	

}
function helpmessage(msg){
  var str="家計簿　削除　現金（クレジット）で最新行を消去する予定¥¥n";
  str+="家計簿のショートカットについては、家計簿　ヘルプ　ショートカット　と入力してください";
  msg.reply(str);
  msg.reply("家計簿　入金　金額（半角）で入金を登録できます。")
  msg.reply("家計簿 カテゴリ　でそのカテゴリの残額が出ます。");
  msg.reply("家計簿　カテゴリ（食費etc） 店名 金額(半角) 支払い元（かず、または、みゆき、の場合は現金、それ以外はクレジット扱い）  で入力");

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


