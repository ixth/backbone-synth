var KeyboardAbstractView = require('views/KeyboardAbstractView');
var $ = require('jquery');
require('keys.css');

module.exports = KeyboardAbstractView.extend({
    className: 'keyboard',

    play: function (tone) {
        this.getKey(tone).addClass('key_active');
    },

    stop: function (tone) {
        this.getKey(tone).removeClass('key_active');
    },

    render: function () {
        var from = this.attributes.from,
            to = this.attributes.to;

        for (var tone = from; tone < to; tone++) {
            this._renderKey(tone).appendTo(this.$el);
        }

        return this;
    },

    _renderKey: function (tone) {
        var mods = {
            'c': '',
            'c#': 'key_black key_left',
            'd': '',
            'd#': 'key_black key_right',
            'e': '',
            'f': '',
            'f#': 'key_black key_left',
            'g': '',
            'g#': 'key_black',
            'a': '',
            'a#': 'key_black key_right',
            'b': ''
        };

        var note = Object.keys(mods)[tone % 12];

        var className = ['key'];

        if (mods[note]) {
            className.push(mods[note]);
        }

        return $('<span/>', {
            'class': className.join(' '),
            'data-tone': tone,
            'title': note
        });
    },

    getKey: function (tone) {
        return this.$('.key[data-tone=' + tone + ']');
    }
});
