child_process = require 'child_process'

module.exports = (robot) ->
  robot.hear /py Hello/i, (msg) ->
    username = msg.message.user.name
    get_temperature(msg)
    msg.send "Hello, " + username


get_temperature = (msg) ->
    #python/test.py
    child_process.exec "python python/gas_home1.py", (error, stdout, stderr) ->
      if !error
        try
          msg.reply stdout
          #dict = JSON.parse(stdout)
          #temp = dict["Temperature"]
          #hudi = dict["Humidity"]
          msg.reply "実行しました"
        catch e
          msg.reply "#{e}"
      else
        msg.reply "#{error}"
