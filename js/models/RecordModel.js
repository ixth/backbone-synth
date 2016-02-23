module.exports = Backbone.Model.extend({
    constructor: function (source) {
        this.source = source;
        this.store = [];
    },

    start: function () {
        this.store = [];
        this.listenTo(this.source, 'message', function (message) {
            this.store.push(message);
        });
    },

    stop: function () {
        this.stopListening(this.source);
    },

    toJSON: function () {
        return [].concat(this.store);
    }
});
