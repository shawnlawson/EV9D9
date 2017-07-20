var mouseX = 0,
  mouseY = 0,
  mouseClickX = 0,
  mouseClickY = 0
var quality = 0.5

var meter = null
var debugging = false

function resizeGL (pixelSize) {
  renderer.setPixelRatio(pixelSize)
  renderer.setSize(window.innerWidth, window.innerHeight)

  RTTPing.setSize(window.innerWidth, window.innerHeight)
  RTTPong.setSize(window.innerWidth, window.innerHeight)

  camera.left = -1
  camera.right = 1
  camera.top = 1
  camera.bottom = -1
  camera.updateProjectionMatrix()
}

$(window)
  .resize(function () {
    if (camera !== null && renderer !== null) {
      resizeGL(quality)
    }
  })

$(document)
  .ready(function () {
      /// /////////////////////////////////
      //  Footer
      /// /////////////////////////////////
    $('#footer')
          .mouseover(function (event) {
            $('#footerUI').fadeIn('fast')
          })
          .mouseleave(function (event) {
            $('#footerUI').fadeOut('slow')
          })

    meter = new FPSMeter(document.getElementById('myFrameRate'), {
      top: '4px',
      graph: 0,
      theme: 'codenobi'
    })

    $('#selectQuality')
          .selectmenu({
            width: 'auto',
            position: { collision: 'flip' }
          })
          .on('selectmenuchange', function (event, data) {
            quality = data.item.value
            resizeGL(quality)
          })

    $('#selectFontSize')
          .selectmenu({
            width: 'auto',
            position: { collision: 'flip' }
          })
          .on('selectmenuchange', function (event, data) {
            editor.setOptions({
              fontSize: data.item.value + 'pt'
            })
          })

    $('#debug')
          .button()
          .bind('change', function () {
            debugging = !debugging
            setShaderFromEditor()
          })

    $('#colorCorrectButton')
          .button()
          .click(function (event) {
            $('#colorCorrectPanel').dialog('open')
          })

    $('#play')
          .button()
          .bind('change', function (event) { // because this is checked every frame,
              // I think bool is faster than jquery checkbox->state?
            isRendering = !isRendering
          })

    $('#playback')
          .button()
          .click(function () {
            if ($('.livewriting_navbar').dialog('isOpen')) {
              $('.livewriting_navbar').parent().css('visibility', 'visible')
            } else {
              $('.livewriting_navbar').dialog('open')
            }
          })

    $('.livewriting_navbar')
          .dialog({
            autoOpen: false,
            maxHeight: 400,
            minWidth: 800,
            show: {
              effect: 'clip',
              duration: 250
            },
            hide: {
              effect: 'clip',
              duration: 250
            },
            beforeClose: function (event, ui) {
              $(this).parent().css('visibility', 'hidden')
              event.preventDefault()
              return false
            }
          })
  }) // end document ready

  // TODO::::
  // .tooltip()

  .mousemove(function (event) {
    mouseX = event.pageX
    mouseY = event.pageY
  }) // end document mousemove

  .mousedown(function (event) {
    mouseClickX = event.pageX
    mouseClickY = event.pageY
  }) // end document mousedown

  .mouseup(function (event) {})

  .keydown(function (event) {
      // updateKeyboardDown(event.keyCode);
    if (event.ctrlKey === true && event.shiftKey === true) {
      $('#footer').fadeToggle('slow', function () {})
      $('#editor').fadeToggle('slow', function () {})
    }
  }) // end document keydown

  .keyup(function (event) {
      // updateKeyboardUp(event.keyCode);
  }) // end document keyup
  .on('dragenter', function (event) {
    event.stopPropagation()
    event.preventDefault()
  })
  .on('dragover', function (event) {
    event.stopPropagation()
    event.preventDefault()
  })
  .on('drop', function (event) {
    event.stopPropagation()
    event.preventDefault()
  })

function addStyleRule (css) {
  var styleElement
  if (typeof document === 'undefined' || document === null) {
    return
  }
  if (!editor.addedStyleRules) {
    editor.addedStyleRules = {}
    styleElement = document.createElement('style')
    document.documentElement.getElementsByTagName('head')[0].appendChild(styleElement)
    editor.addedStyleSheet = styleElement.sheet
  }
  if (editor.addedStyleRules[css]) {
    return
  }
  editor.addedStyleRules[css] = true
  return editor.addedStyleSheet.insertRule(css, 0)
}
