var share=require("./share.js");

share.money=function(p){
  //現金、クレジットの区別
  if(p=="かず"){
     return "2";
  }else if(p=="みゆき"){
     return "2";
  }else if(p=="現金"){
	return "2";
  }else if(p=="クレジット"){
	return "8";  	
  }
  else{
     return "8";
  }
}

share.inMoney=function(p){
  //入金のところの列の設定
  if(p=="かず"){
     return "68";
  }else{
     return "75";
  }
}
//入金のところの行
share.inMoneyCol="6";

share.lineO=84;

share.nMap=function(p){
  if(p=="k.akai"){
     return "かず";
  }else if(p=="a.miyuki"){
     return "みゆき";
  }else{
     return null;
  }
}
share.pMap=function(p){
  if(p=="食費"){
     return "G51";
  }else if(p=="生活費"){
     return "G52";
  }else if(p=="かず小遣い"){
     return "G54";
  }else if(p=="こども費"){
     return "G53";
  }else if(p=="みゆ小遣い"){
     return "G55";
  }else if(p=="医療費"){
     return "G56";
  }else if(p=="特別費"){
     return "G57";
  }else if(p=="臨時支出"){
     return "G58";
  }else{
     return null;
  }
}
