var _ = require('underscore');
var Note = require('views/note');
var KeyboardAbstractView = require('views/KeyboardAbstractView');
var AudioContext = window.AudioContext || window.webkitAudioContext;

module.exports = KeyboardAbstractView.extend({
    constructor: function () {
        KeyboardAbstractView.apply(this, arguments);

        this._context = new AudioContext();
    },

    getTone: _.memoize(function (tone) {
        return new Note(this._context, tone);
    }),

    play: function (tone) {
        this.getTone(tone).play();
    },

    stop: function (tone) {
        this.getTone(tone).stop();
    }
});
