# scripts/helloworld2.coffee
module.exports = (robot) ->
  robot.hear /@home Hello/i, (msg) ->
    username = msg.message.user.name
    msg.send "Hello, " + username


