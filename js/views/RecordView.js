var _ = require('lodash');
var Mustache = require('mustache');
var MIDIMessage = require('models/MIDIMessage');

/**
 * @class KeyboardWriter
 */
module.exports = Backbone.View.extend({
    tagName: 'span',
    className: 'record',

    events: {
        'click .record__start': 'start',
        'click .record__stop': 'stop',
        'click .record__save': 'save'
    },

    delegateEvents: function () {
        Backbone.View.prototype.delegateEvents.apply(this, arguments);

        var recordView = this;
        window.addEventListener('keydown', function (e) {
            if ((e.metaKey || e.ctrlKey) && e.keyCode === 83) {
                e.preventDefault();
                recordView.save();
            }
        });
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    template: _.partial(Mustache.render, Backbone.$('#record').html()),

    start: function () {
        this.model.start();
    },

    stop: function () {
        this.model.stop();
    },

    save: function () {
        this.constructor._save(this.model.toBlob('smf'), 'test.mid');
    }
}, {
    _save: function (blob, fileName) {
        var $a = Backbone.$('<a/>').hide().appendTo(document.body);
        var url = URL.createObjectURL(blob);

        $a.attr({ href: url, download: fileName}).get(0).click();
        URL.revokeObjectURL(url);
    }
});