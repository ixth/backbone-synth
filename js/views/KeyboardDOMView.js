var _ = require('lodash');
var Mustache = require('mustache');
var KeyboardAbstractView = require('views/KeyboardAbstractView');
require('keys.css');

/**
 * @class KeyboardDOMView
 */
module.exports = KeyboardAbstractView.extend({
    className: 'keyboard',

    play: function (tone) {
        this.getKey(tone).addClass('key_active');
    },

    stop: function (tone) {
        this.getKey(tone).removeClass('key_active');
    },

    render: function () {
        this.$el.html(this.template(this.presenter(this.attributes)));
        return this;
    },

    presenter: function (attributes) {
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

        var from = attributes.from,
            to = attributes.to;

        return {
            keys: _.map(_.range(from, to), function (tone) {
                var note = Object.keys(mods)[tone % 12];
                return {
                    'class': mods[note] ? 'key ' + mods[note]: 'key',
                    'tone': tone,
                    'title': note
                };
            })
        };
    },

    template: _.partial(Mustache.render, Backbone.$('#keyboard').html()),

    getKey: function (tone) {
        return this.$('.key[data-tone=' + tone + ']');
    }
});
