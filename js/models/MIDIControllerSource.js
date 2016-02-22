var MIDIMessage = require('models/MIDIMessage');

module.exports = Backbone.Model.extend({
    constructor: function () {
        Backbone.Model.call(this);

        this.initHandlers = this.initHandlers.bind(this);
        this.handleAccessError = this.handleAccessError.bind(this);

        this.requestAccess()
            .then(this.initHandlers, this.handleAccessError);
    },

    requestAccess: function () {
        return navigator.requestMIDIAccess();
    },

    initHandlers: function (access) {
        access.inputs.forEach(function (port, id) {
            port.onmidimessage = this._onMIDIMessage.bind(this);
        }, this);
    },

    handleAccessError: function (e) {
        // FIXME: make error handling more [object Object]-proof
        console.error('MIDIControllerSource: %s', e.message || e);
    },

    _onMIDIMessage: function (e) {
        this.trigger('message', new MIDIMessage(e.data));
    }
});
