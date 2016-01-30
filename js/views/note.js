function Note(context, tone) {
    this._context = context;

    this._oscillator = this._createOscillator(this._frequencyFromNote(tone));
    this._gain = this._createGain(0);

    this._oscillator.start();
    this._oscillator.connect(this._gain);
    this._gain.connect(this._context.destination);
}

Object.assign(Note.prototype, {
    play: function () {
        this._gain.gain.value = 1;
    },

    stop: function () {
        this._gain.gain.value = 0;
    },

    _createOscillator: function (frequency) {
        var node = this._context.createOscillator();
        Object.assign(node.frequency, {
            type: 'sine',
            value: frequency
        });
        return node;
    },

    _createGain: function (gain) {
        var node = this._context.createGain();
        Object.assign(node.gain, {
            value: gain
        });
        return node;
    },

    _frequencyFromNote: function (tone) {
        return 440 * Math.pow(2, (tone - 69) / 12);
    }
});

module.exports = Note;
