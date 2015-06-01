$(window).load(function () {

  var audio = new Audio('./media/change.mp3');

  $(document).on('keyup', function (e) {
    if (e.keyCode === 13) {
      audio.paused ? audio.play() : audio.pause();
    }
  });

  var spectrumAnalyser = new SpectrumAnalyser();
  spectrumAnalyser.setup(audio);
  spectrumAnalyser.renderFrequencyBands();
  spectrumAnalyser.startAnalysis();

});