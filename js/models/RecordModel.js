var MIDITrack = require('./MIDITrack');
var MIDIContainer = require('./MIDIContainer');

module.exports = Backbone.Model.extend({
    constructor: function (source) {
        this.source = source;
        this.store = [];
    },

    start: function () {
        this.store.length = 0;
        this.listenTo(this.source, 'message', function (message) {
            this.store.push(message);
        });
    },

    stop: function () {
        this.stopListening(this.source);
    },

    toBlob: function (type) {
        switch (type) {
            case 'json':
                return this.constructor._toJSON(this.store);

            case 'smf':
                return this.constructor._toSMF(this.store);
        }
    }
}, {
    _toSMF: function (store) {
        var midi = new MIDIContainer();
        midi.addTrack(new MIDITrack(store));
        return midi.toBlob();
    },

    _toJSON: function (store) {
        return new Blob([ JSON.stringify(store) ], { type: 'octet/stream' });
    }
});
