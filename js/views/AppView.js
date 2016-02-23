var Backbone = require('backbone');
var RecordModel = require('../models/RecordModel');
var RecordView = require('./RecordView');
var KeyboardDOMView = require('./KeyboardDOMView');
var KeyboardWebAudioView = require('./KeyboardWebAudioView');
var KeyboardConsoleView = require('./KeyboardConsoleView');

module.exports = Backbone.View.extend({
    constructor: function (options) {
        Backbone.View.apply(this, arguments);

        this.keyboard = new KeyboardDOMView({
            model: options.source,
            attributes: {
                from: 12 * 4,
                to: 12 * 6
            }
        }).render();
        this.keyboard.$el.appendTo(this.$el);

        this.recorder = new RecordView({ model: new RecordModel(options.source) }).render();
        this.recorder.$el.appendTo(this.$el);

        this.console = new KeyboardConsoleView({ model: options.source });
        this.audio = new KeyboardWebAudioView({ model: options.source });
    }
});