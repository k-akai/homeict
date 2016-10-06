var share=require("./share.js");

share.money=function(p){
  //現金、クレジットの区別
  if(p=="かず"){
     return "2";
  }else if(p=="みゆき"){
     return "2";
  }else{
     return "8";
  }
}

share.lineO=84;

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
