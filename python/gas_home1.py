# coding: UTF-8

import urllib2
import os
import json
import sys

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

def main():

  inpar=sys.argv
  sheetid=""
  for k, v in os.environ.items():
    if k=="GAS_PARAMETER_SHEET":
      sheetid=v

  #アクセストークンの取得
  aut=getAuth()

  #API呼び出し
  if inpar[1]=="getTest1":
    ret=setgae(aut,inpar[1],[sheetid,inpar[2]])
    data=json.loads(ret)
    if data["response"]["result"]["resp"]=="OK":
      print data["response"]["result"]["message"]

  else:
    print "no method"

  

if __name__ == '__main__':
  main()
