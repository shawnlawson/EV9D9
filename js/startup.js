
webAudioCleanup()
var audio = createAudioElement(['audio/ev9d9.mp3'], ['mp3'], 'serverSound')
$('#myAudioFile').after(audio)

bandsOn = true

mSound.mSource = mAudioContext.createMediaElementSource(audio)
mSound.mSource.disconnect()
mSound.mSource.connect(mSound.mAnalyser)
mSound.mAnalyser.connect(mAudioContext.destination)

$.when($.ajax({ url: 'recording/EV9D9.txt', dataType: 'text' }))
    .done(function (r) {
      editor.livewriting('playJson', r)
    })
