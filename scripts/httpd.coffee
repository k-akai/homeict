module.exports = (robot) ->
  robot.router.get "/version", (req, res) ->
    res.end robot.version
