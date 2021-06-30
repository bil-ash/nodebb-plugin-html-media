'use strict'
;(function(VideoPlayer) {
  var regExps = [
    {
      // local video
      from: /<a href="\/(:*.*.(mp4|ogv|mov|webm))">local-player<\/a>/g,
      // prettier-ignore
      to: '<video src="/$1" controls preload autobuffer width="100%" />' 
    }
  ]

  VideoPlayer.parse = function(data, callback) {
    if (!data || !data.postData || !data.postData.content) {
      return callback(null, data)
    }

    var err = null

    try {
      for (var i = 0; i < regExps.length; i++) {
        data.postData.content = data.postData.content.replace(
          regExps[i].from,
          regExps[i].to
        )
      }
    } catch (e) {
      err = e
    }

    callback(err, data)
  }

  VideoPlayer.addScripts = function(scripts, callback) {
      //TODO 判断是否支持 HTML5 video 标签
    scripts.push('/static/html5media.min.js')
    callback(null, scripts)
  }
})(module.exports)
