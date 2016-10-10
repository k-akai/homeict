# coding: UTF-8

import urllib2
import os
import json
import sys
import datetime


def getAuth():
  cs=""
  cid=""
  ref=""
  for k, v in os.environ.items():
    if k=="AUTH_CR_SECRET":
      cs=v
    if k=="AUTH_CR_ID":
      cid=v
    if k=="REFRESH_TOKEN":
      ref=v

  url="https://www.googleapis.com/oauth2/v4/token"
  pos="client_secret="+cs+"&grant_type=refresh_token&refresh_token="+ref+"&client_id="+cid
  headers ={
    "content-type":"application/x-www-form-urlencoded",
  }


  req = urllib2.Request(url,pos,headers)
  r = urllib2.urlopen(req).read()
  return json.loads(r)


def setgae(inj,func,parameter):

  auth=inj["access_token"]
  auth="Bearer "+auth

  sheetid=""
  apiid=""


  for k, v in os.environ.items():
    if k=="GAS_PARAMETER_SHEET":
      sheetid=v
    if k=="GAS_APIID_HOME":
      apiid=v
  url="https://script.googleapis.com/v1/scripts/"+apiid+":run"
  headers ={
    "Authorization":auth,
    "Content-type":"application/json",
  }

  jsonb={}
  jsonb["function"]=func
  jsonb["parameters"]=parameter
  jsonb["devMode"]="true"

  encodeJson = json.dumps(jsonb, indent=4)

  req = urllib2.Request(url,encodeJson,headers)
  res = urllib2.urlopen(req)
  r = res.read()
  return r
def makeRes1(data):
  yosan=int(data["response"]["result"]["yosan"])
  syouka=int(data["response"]["result"]["syouka"])
  today = datetime.datetime.today()
  day=int(today.day) 
  #今月が何日あるか
  next_month =datetime.date(today.year, today.month % 12 + 1, 1)
  last_day= next_month - datetime.timedelta(days=1)
  last_day=int(last_day.day)
  zan=float(syouka)/yosan
  zan=1-zan
  zanday=float(day)/float(last_day)
  print "予算:"+str(yosan)+",残額:"+str(syouka)+",消費率:"+str(zan)+",(日数率:"+str(zanday)+")"
  if(zanday<zan):
      print "赤字傾向です"
  else:
      print "黒字傾向です"
def main():
  inpar=sys.argv
  sheetid=""
  for k, v in os.environ.items():
    if k=="GAS_PARAMETER_SHEET":
      sheetid=v

  #アクセストークンの取得
  aut=getAuth()

  if inpar[1]=="get2col":
    ret=setgae(aut,inpar[1],[sheetid,inpar[2]])
    data=json.loads(ret)
    if data["response"]["result"]["resp"]=="OK":
      makeRes1(data) 
  elif inpar[1]=="get2col2":
    ret=setgae(aut,inpar[1],[sheetid,inpar[2]])
    data=json.loads(ret)
    if data["response"]["result"]["resp"]=="OK":
         makeRes1(data)
  elif inpar[1]=="setTest1":
    ret=setgae(aut,inpar[1],[sheetid,inpar[2],inpar[3],inpar[4],inpar[5],inpar[6],inpar[7]])
    data=json.loads(ret)
    if data["response"]["result"]["resp"]=="OK":
      if inpar[6]=="2":
        print str(data["response"]["result"]["message"])+":行目に現金として追加しました"
      else:
        print str(data["response"]["result"]["message"])+"：行目にクレジットとして追加しました"
    else:
      print "error"+str(data["response"]["result"]["message"])
  elif inpar[1]=="setIncome":
    ret=setgae(aut,inpar[1],[sheetid,inpar[2],inpar[3],inpar[4]])
    data=json.loads(ret)
    if data["response"]["result"]["resp"]=="OK":
      print str(data["response"]["result"]["message"])+":行目に入金追加しました"
  elif inpar[1]=="delete1":
    ret=setgae(aut,inpar[1],[sheetid,inpar[3],inpar[2]])
    data=json.loads(ret)
    if data["response"]["result"]["resp"]=="OK":
      print str(data["response"]["result"]["message"])+":行目を削除しました"
    else:
      print "削除に失敗しました"
  else:
    print "no method"

  

if __name__ == '__main__':
  main()
