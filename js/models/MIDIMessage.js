var assert = require ('assert');

/*
   MIDI message, according to spec
   https://www.midi.org/specifications/item/table-1-summary-of-midi-message
*/
function MIDIMessage(data) {
    assert(data[0] > 0x7f, 'Status code should be more than 0x7f');

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
};

MIDIMessage.NOTE_OFF = 0x80;
MIDIMessage.NOTE_ON = 0x90;

module.exports = MIDIMessage;
