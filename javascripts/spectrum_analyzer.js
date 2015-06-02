function SpectrumAnalyser () {
  this.numOfFrequencyBands = 512;
  this.context = new AudioContext();
  this.frequencyData = new Uint8Array(this.numOfFrequencyBands);
  this.output = this.context.destination;
}

SpectrumAnalyser.prototype.renderFrequencyBands = function () {
  for (var i = 0; i < this.numOfFrequencyBands; i++) {
    $barContainer = $('<div class="bar-container"><div class="bar"></div></div>');
    $('body').append($barContainer);
    var degrees = ((i + 1) / this.numOfFrequencyBands) * 360;
    var coords = polarToCartesian(200, degrees);
    $barContainer.css({
      "top" : $(window).height() / 2 + coords.y - 50,
      "left" : $(window).width() / 2 + coords.x,
      "webkit-transform" : 'rotate(-' + degrees + 'deg)'
    });
  }
};

SpectrumAnalyser.prototype.setupWith = function (audio) {
  this.audio = audio;
  this.audio.crossOrigin = 'anonymous';
  this.source = this.context.createMediaElementSource(this.audio);
  this.output = this.context.destination;
  this.analyser = this.context.createAnalyser();
  this.analyser.fftSize = this.numOfFrequencyBands * 2;
  this.source.connect(this.analyser);
  this.analyser.connect(this.output);
};

SpectrumAnalyser.prototype.startAnalysis = function () {
  this.audio.play();
  var self = this;
  var interval = setInterval(function() {
    self.analyser.getByteFrequencyData(self.frequencyData);
    var avgAmp = averageOf(self.frequencyData);
    $('#outer-metronome').css({height: 255 - avgAmp, width: 255 - avgAmp})
    $('#inner-metronome').css({height: avgAmp, width: avgAmp})
    $('.bar').each(function (index, bar) {
      var amp = self.frequencyData[index];
      $(bar).css({
        '-webkit-transform' : 'rotate(' + amp + 'deg)',
        'background' : 'rgb(255,' + amp + ',46)'
      });
    });
  }, 30);
};

SpectrumAnalyser.prototype.changeSourceTo = function (audio) {
  this.audio.pause();
  this.audio = audio;
  this.audio.crossOrigin = 'anonymous';
  this.source = this.context.createMediaElementSource(this.audio);
  this.source.connect(this.analyser);
  this.audio.play();
};





















