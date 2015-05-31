
$(window).load(function () {

  var audio = new Audio('./media/just-say-nothing.mp3');
  // var audio = new Audio('./media/house.mp3');
  // var audio = new Audio('./media/concrete.mp3');
  // var audio = new Audio('./media/change.mp3');

  $(document).on('keyup', function (e) {
    if (e.keyCode === 13) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  });

  var spectrumLength = 1024 / 2;
  for (var i = 0; i < spectrumLength; i++) {
    $barContainer = $('<div class="bar-container"></div>');
    $bar = $('<div class="bar"></div>');
    $('#spectrum').append($barContainer);
    $barContainer.append($bar);
    // var degrees = ((i + 1) / spectrumLength) * 5000;
    // $barContainer.css({
    //   "webkit-transform" : 'rotate(' + degrees + 'deg)'
    // });
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
    analyser.getByteFrequencyData(frequencyData);
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