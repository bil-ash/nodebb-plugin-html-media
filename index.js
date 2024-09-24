'use strict'
;(function(VideoPlayer) {
  var regExps = [
    {
      // local video
      from: /<a href="\/(:*.*.(mp4|webm))">.*<\/a>/g,
      // prettier-ignore
      to: '<video src="/$1" controls="controls" controlsList="nodownload" preload="metadata" style="width: 100%;object-fit: contain;"/>' 
    },
    {
      // local audio
      from: /<a href="\/(:*.*.(mp3|aac))">.*<\/a>/g,
      // prettier-ignore
      to: '<audio src="/$1" controls="controls" controlsList="nodownload" preload="metadata"/>' 
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
/*
  VideoPlayer.addScripts = function(scripts, callback) {
      //TODO 判断是否支持 HTML5 video 标签
    scripts.push('/static/html4media.min.js')
    callback(null, scripts)
  }
//guess this is not required
  */
})(module.exports)
