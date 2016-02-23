module.exports = MIDIContainer;

function MIDIContainer() {
    this._ticksPerBeat = 500;
    this._tracks = [];
}

MIDIContainer.TRACKS_SINGLE = 0;
MIDIContainer.TRACKS_MULTIPLE = 1;
MIDIContainer.TRACKS_SEQUENCE = 2;

MIDIContainer.prototype.addTrack = function (track) {
    this._tracks.push(track);
};

MIDIContainer.prototype.toBlob = function () {
    return new Blob([].concat(
        this.getHeaderChunk(),
        this.getTrackChunks()
    ), { type: 'application/octet-binary' });
};

/**
 * @returns {ArrayBuffer}
 */
MIDIContainer.prototype.getHeaderChunk = function () {
    var buffer = new ArrayBuffer(0x0e),
        view = new DataView(buffer);

    var type = this._tracks.length > 1 ?
        MIDIContainer.TRACKS_MULTIPLE :
        MIDIContainer.TRACKS_SINGLE;

    writeString.call(view, 0x00, 'MThd');
    view.setUint32(0x04, 6);
    view.setUint16(0x08, type);
    view.setUint16(0x0a, this._tracks.length);
    view.setInt16(0x0c, this._ticksPerBeat);

    return buffer;
};

/**
 * @returns {ArrayBuffer[]}
 */
MIDIContainer.prototype.getTrackChunks = function () {
    return this._tracks.map(function (track) {
        return track.toArrayBuffer();
    });
};

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
}