var KeyboardModel = Backbone.Model.extend({
    constructor: function () {
        this.handleMIDI();
        this.handleKeyboard();
    },

    handleKeyboard: function () {
        $(window).on('keyup keydown', function (e) {
            var index = model.keyMap(e.keyCode);
            if (index == null) {
                return;
            }

            if (e.type === 'keydown') {
                model.trigger('noteOn', new MIDIMessage([
                    MIDIMessage.NOTE_ON,
                    12 * 5 + index,
                    0x3f
                ]));
            } else if (e.type === 'keyup') {
                model.trigger('noteOff', new MIDIMessage([
                    MIDIMessage.NOTE_OFF,
                    12 * 5 + index,
                    0
                ]));
            }
        });

        this.on('all', function () { console.log(arguments); });
    },

    handleMIDI: function () {
        requestMIDIAccess().then(function (access) {
            access.inputs.forEach(function (port, id) {
                port.onmidimessage = onMIDIMessage;
            });

            var model = this;
            function onMIDIMessage(e) {
                var msg = new MIDIMessage(e.data);
                switch (msg.type) {
                    case MIDIMessage.NOTE_ON:
                        model.trigger('noteOn', msg);
                        break;

                    case MIDIMessage.NOTE_OFF:
                        model.trigger('noteOff', msg);
                        break;

                    default:
                        model.trigger('unknown', msg);
                        break;
                }
            }
        });
    },

    onMIDIInput: function () {

    },

    onKeyboardInput: function () {

    },

    keyMap: function (keyCode) {
        var keys = [90, 83, 88, 68, 67, 86, 71, 66, 72, 78, 74, 77, 188, 76, 190, 186, 191];
        var index = keys.indexOf(keyCode);
        return index < 0 ? null : index;
    }
});

function MIDIMessage(data) {
    if (data[0] < 0x80) {
        throw "Status code should be more than 0x7f.";
    }
    this.status = data[0];
    this.channel = data[0] & 0x0f;
    this.type = data[0] & 0xf0;

    this.data = Array.prototype.slice.call(data, 1);

    if (
        this.type === MIDIMessage.NOTE_ON &&
        this.data[1] === 0
    ) {
        this.type = MIDIMessage.NOTE_OFF;
    }

    if (
        this.type === MIDIMessage.NOTE_ON ||
        this.type === MIDIMessage.NOTE_OFF
    ) {
        this.note = this.data[0] % 12;
        this.octave = Math.floor(this.data[0] / 12);
    }
}

MIDIMessage.NOTE_OFF = 0x80;
MIDIMessage.NOTE_ON = 0x90;

function requestMIDIAccess() {
    return navigator.requestMIDIAccess();
}
