var clientID = "656bff24d3cc1779a665f5d2ca2af810"
var spectrumAnalyser = new SpectrumAnalyser();
var audio;

$(window).load(function () {

  $('#soundcloud-form').on('submit', function (e) {
    e.preventDefault();
    var url = $('#soundcloud-url').val()
    $.ajax({
      type: "GET",
      url: 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + clientID
    }).done(function (res) {
      var streamUrl = res.stream_url + '?client_id=' + clientID;
      audio = new Audio(streamUrl);
      audio.crossOrigin = 'anonymous';
      spectrumAnalyser.setup(audio);
      spectrumAnalyser.renderFrequencyBands();
      spectrumAnalyser.startAnalysis();
      $('form').hide();

      $(document).on('keyup', function (e) {
        if (e.keyCode === 13) {
          audio.paused ? audio.play() : audio.pause()
        }
      });

    }).fail(function (res) {
      alert('invalid url brah')
    });
  });

});