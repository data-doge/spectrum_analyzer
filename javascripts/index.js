var clientID = "656bff24d3cc1779a665f5d2ca2af810"

$(window).load(function () {

  var spectrumAnalyser = new SpectrumAnalyser();
  spectrumAnalyser.renderFrequencyBands();

  $('#soundcloud-form').on('submit', function (e) {
    e.preventDefault();
    var url = $('#soundcloud-url').val()
    $.ajax({
      type: "GET",
      url: 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + clientID
    }).done(function (res) {
      var streamUrl = res.stream_url + '?client_id=' + clientID;
      var audio = new Audio(streamUrl);
      $('#title').text(res.title);
      if (spectrumAnalyser.audio) {
        spectrumAnalyser.changeSourceTo(audio);
      } else {
        spectrumAnalyser.setupWith(audio);
        spectrumAnalyser.startAnalysis();
      }
      $('#soundcloud-form')[0].reset();
    }).fail(function (res) {
      alert('invalid url brah')
    });
  });

});