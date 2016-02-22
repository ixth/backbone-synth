var MIDIMessage = require('models/MIDIMessage');

/**
 * @class KeyboardSource
 */
module.exports = Backbone.Model.extend({
    constructor: function () {
        Backbone.Model.call(this);

        this.initHandlers();
        this.timeOrigin = performance.now();
    },

    initHandlers: function () {
        window.addEventListener('keyup', this._onKeyEvent.bind(this));
        window.addEventListener('keydown', this._onKeyEvent.bind(this));
    },

    _onKeyEvent: function (e) {
        var index = this.keyMap(e.keyCode);
        if (index == null) {
            return;
        }

        if (e.shiftKey) {
            index += 12;
        }

        if (e.type === 'keydown') {
            this.trigger('message', new MIDIMessage({
                data: [MIDIMessage.NOTE_ON, index, 0x3f],
                receivedTime: performance.now() - this.timeOrigin
            }));
        } else if (e.type === 'keyup') {
            this.trigger('message', new MIDIMessage({
                data: [MIDIMessage.NOTE_OFF, index, 0],
                receivedTime: performance.now() - this.timeOrigin
            }));
        }
    },

    /*
        Mapping lower row of keyboard keys to notes
    */
    keyMap: function (keyCode) {
        var keys = [90, 83, 88, 68, 67, 86, 71, 66, 72, 78, 74, 77, 188, 76, 190, 186, 191];
        var index = keys.indexOf(keyCode);
        return index > -1 ? (12 * 4 + index) : null;
    }
});
