module.exports = MIDITrack;

function MIDITrack(events) {
    this._events = events || [];
}

/**
 * @returns {ArrayBuffer}
 */
MIDITrack.prototype.toArrayBuffer = function () {
    var buffer = new ArrayBuffer(0x4000),
        header = new DataView(buffer),
        events = new DataView(buffer, 0x08);

    var pointer = 0;
    this._events.forEach(function (event, i, _events) {
        var prevMessage = _events[i - 1];
        var delta = prevMessage ? event.receivedTime - prevMessage.receivedTime : 0;
        pointer = writeArray.call(events, pointer, varLength(Math.round(delta)));
        pointer = writeArray.call(events, pointer, event.data);
    });

    writeString.call(header, 0x00, 'MTrk');
    header.setUint32(0x04, pointer);

    return buffer.slice(0, pointer + 0x08 + 1);
};

function varLength(number, flag) {
    if (number > 0) {
        return varLength(number >>> 7, true).concat(flag ? (number | 0x80) : (number & 0x7f));
    } else if (flag) {
        return [];
    } else {
        return [0];
    }
}

function writeString(offset, string) {
    var array = string.split('').map(function (char) {
        return char.charCodeAt(0);
    });
    return writeArray.call(this, offset, array);
}

function writeArray(offset, array) {
    array.forEach(function (val, i) {
        this.setUint8(offset + i, val);
    }, this);
    return offset + array.length;
}