var MIDIMessage = require('models/MIDIMessage');

/**
 * @class KeyboardWriter
 */
module.exports = Backbone.Model.extend({
    constructor: function (attributes, options) {
        Backbone.Model.apply(this, arguments);

        this.source = options.source;
        this.store = [];

        this.initHandlers();
    },

    initHandlers: function () {
        this.listenTo(this.source, 'message', function (message) {
            this.store.push(message);
        });
    },

    dump: function () {
        this.constructor._dump(this.store, 'log.json');
    }
}, {
    _dump: function (data, fileName) {
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';

        var url = window.URL.createObjectURL(new Blob([
            JSON.stringify(data)
        ], { type: 'octet/stream' }));

        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }
});