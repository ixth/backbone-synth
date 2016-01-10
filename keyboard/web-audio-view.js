function Note(context, index) {
    this._context = context;

    this._oscillator = this._createOscillator(this._frequencyFromNote(index));
    this._gain = this._createGain(0);

    this._oscillator.start();
    this._oscillator.connect(this._gain);
    this._gain.connect(this._context.destination);
}

$.extend(Note.prototype, {
    play: function () {
        this._gain.gain.value = 1;
    },

    stop: function () {
        this._gain.gain.value = 0;
    },

    _createOscillator: function (frequency) {
        var node = this._context.createOscillator();
        $.extend(node.frequency, {
            type: 'sine',
            value: frequency
        });
        return node;
    },

    _createGain: function (gain) {
        var node = this._context.createGain();
        $.extend(node.gain, {
            value: gain
        });
        return node;
    },

    _frequencyFromNote: function (index) {
        return 440 * Math.pow(2, (index - 69) / 12);
    }
});

var KeyboardWebAudioView = Backbone.View.extend({
    constructor: function () {
        Backbone.View.apply(this, arguments);
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        this._context = new AudioContext();
        this._keys = {};
        this.listenTo(this.model, {
            'noteOn': function (msg) {
                this.press(msg.note, msg.octave);
            },
            'noteOff': function (msg) {
                this.release(msg.note, msg.octave);
            }
        });
    },

    getNote: function (note, octave) {
        var index = this._index(note, octave);
        if (!this._keys.hasOwnProperty(index)) {
            this._keys[index] = new Note(this._context, index);
        }

        return this._keys[index];
    },

    press: function (note, octave) {
        this.getNote(note, octave).play();
    },

    release: function (note, octave) {
        this.getNote(note, octave).stop();
    },

    _index: function (note, octave) {
        return (octave ? octave * 12 : 0) + note;
    }
});
