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

    _onMIDIEvent: function (e) {
        var msg = new MIDIMessage(e.data);
        switch (msg.type) {
            case MIDIMessage.NOTE_ON:
                this.trigger('noteOn', msg);
                break;

            case MIDIMessage.NOTE_OFF:
                this.trigger('noteOff', msg);
                break;

            default:
                this.trigger('unknown', msg);
                break;
        }
    }
});
