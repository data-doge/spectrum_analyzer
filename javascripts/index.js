$(window).load(function () {

  var centerCoords = { 
    x: $(window).width() / 2, 
    y: $(window).height() / 2
  };

  var audio = new Audio('./media/just-say-nothing.mp3');

  $(document).on('keyup', function (e) {
    if (e.keyCode === 13) {
      audio.paused ? audio.play() : audio.pause();
    }
  });

  var spectrumLength = 1024 / 2;
  for (var i = 0; i < spectrumLength; i++) {
    $barContainer = $('<div class="bar-container"></div>');
    $bar = $('<div class="bar"></div>');
    var degrees = ((i + 1) / spectrumLength) * 360;
    $('body').append($barContainer);
    var coords = polarToCartesian(200, degrees);
    $barContainer.css({
      top: centerCoords.y + coords.y - 50,
      left: centerCoords.x + coords.x
    });
    $barContainer.append($bar);
    $barContainer.css({
      "webkit-transform" : 'rotate(-' + degrees + 'deg)'
    });
  }
  
  var context = new AudioContext();
  var source = context.createMediaElementSource(audio);
  var analyser = context.createAnalyser();
  analyser.fftSize = 1024;
  var output = context.destination;
  source.connect(analyser);
  analyser.connect(output);

  var frequencyData = new Uint8Array(spectrumLength);
  var $bars = $('.bar');
  var interval = setInterval(function() {
    analyser.getByteFrequencyData((frequencyData));
    var newSum = sumElementsIn(frequencyData) / spectrumLength;
    $('#metronome').css({
      height: 250 - (newSum / 255 * 250),
      width: 250 - (newSum / 255 * 250)      
    })

    $('#inner-metronome').css({
      // opacity : newSum / 255 + 0.2
      height:(newSum / 255 * 250),
      width: (newSum / 255 * 250)      
    })

    $bars.each(function (index, bar) {
      var $bar = $(bar);
      var amplitude = frequencyData[index];
      $bar.css({
        '-webkit-transform' : 'rotate(' + amplitude   + 'deg)',
        'background' : 'rgb(255,' + amplitude + ',46)'
      });
    });
  }, 10);

});