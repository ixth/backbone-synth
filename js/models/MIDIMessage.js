var assert = require ('assert');

/*
   MIDI message, according to spec
   https://www.midi.org/specifications/item/table-1-summary-of-midi-message
*/
function MIDIMessage(data) {
    assert(data[0] > 0x7f, 'Status code should be more than 0x7f');

    this.raw = data;

    this.status = data[0];
    this.channel = MIDIMessage.getChannel(data);
    this.type = MIDIMessage.getType(data);

    this.data = Array.from(data).slice(1);
};

MIDIMessage.NOTE_OFF = 0x80;
MIDIMessage.NOTE_ON = 0x90;

MIDIMessage.getType = function (data) {
    return data[0] & 0xf0;
};

MIDIMessage.getChannel = function (data) {
    return data[0] & 0x0f;
};

module.exports = MIDIMessage;
