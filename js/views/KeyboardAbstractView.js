var MIDIMessage = require('models/MIDIMessage');

/*
    Abstract class, almost nothing to see here
*/
module.exports = Backbone.View.extend({
    constructor: function () {
        Backbone.View.apply(this, arguments);

        this.handleModelEvents();
    },

    handleModelEvents: function () {
        this.listenTo(this.model, 'message', function (message) {
            switch (message.type) {
                case MIDIMessage.NOTE_ON:
                    if (message.data[1] === 0) {
                        this.stop(message.data[0]);
                        break;
                    }
                    this.play(message.data[0]);
                    break;

                case MIDIMessage.NOTE_OFF:
                    this.stop(message.data[0]);
                    break;
            }
        });
    },

    play: function (tone) {
        throw 'Not implemented';
    },

    stop: function (tone) {
        throw 'Not implemented';
    }
});
