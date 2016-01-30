/*
    Abstract class, almost nothing to see here
*/
module.exports = Backbone.View.extend({
    constructor: function () {
        Backbone.View.apply(this, arguments);

        this.handleModelEvents();
    },

    handleModelEvents: function () {
        this.listenTo(this.model, {
            'noteOn': function (msg) {
                this.play(msg.data[0]);
            },

            'noteOff': function (msg) {
                this.stop(msg.data[0]);
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
