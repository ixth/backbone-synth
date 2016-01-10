var KeyboardDOMView = Backbone.View.extend({
    className: 'keyboard',

    constructor: function () {
        Backbone.View.apply(this, arguments)
        this.listenTo(this.model, {
            'noteOn': function (msg) {
                this.press(msg.note, msg.octave);
            },
            'noteOff': function (msg) {
                this.release(msg.note, msg.octave);
            }
        });
    },

    renderOctave: function (len) {
        var mods = {
            'C': '',
            'C#': 'key_black key_left',
            'D': '',
            'D#': 'key_black key_right',
            'E': '',
            'F': '',
            'F#': 'key_black key_left',
            'G': '',
            'G#': 'key_black',
            'A': '',
            'A#': 'key_black key_right',
            'B': ''
        };

        var fragment = document.createElement('div');
        fragment.setAttribute('class', 'octave');

        var i = 0;
        for (var note in mods) {
            if (i++ > len) {
                break;
            }

            var el = document.createElement('span');
            el.title = note;
            el.className = 'key ' + mods[note];

            fragment.appendChild(el);
        }

        return fragment;
    },

    render: function () {
        this.el.innerHTML = '';
        var len = 127;
        while (len > 12) {
            this.el.appendChild(this.renderOctave());
            len -= 12;
        }
        this.el.appendChild(this.renderOctave(len));
        return this;
    },

    press: function (note, octave) {
        this._key(note, octave).classList.add('key_active');
    },

    release: function (note, octave) {
        this._key(note, octave).classList.remove('key_active');
    },

    _index: function (note, octave) {
        return (octave ? octave * 12 : 0) + note;
    },

    _key: function (note, octave) {
        return this.el.querySelectorAll('.key')[this._index(note, octave)];
    }
});
