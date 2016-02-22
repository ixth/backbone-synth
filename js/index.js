var Backbone = require('backbone');

var MIDIControllerSource = require('./models/MIDIControllerSource');
var KeyboardSource = require('./models/KeyboardSource');

var KeyboardWebAudioView = require('./views/KeyboardWebAudioView');
var KeyboardDOMView = require('./views/KeyboardDOMView');
var KeyboardConsoleView = require('./views/KeyboardConsoleView');

var KeyboardWriter = require('./models/KeyboardWriter');

// Using collection for event aggregation from multiple sources
var compositeSource = new Backbone.Collection();
compositeSource.add(new MIDIControllerSource());
compositeSource.add(new KeyboardSource());

/*
    There are three views, each of them shares common interface KeyboardAbstractView
    and handles events from composite source in it's own way

    KeyboardDOMView is a classical DOM presentation

    KeyboardConsoleView logs it's events to console

    KeyboardWebAudioView plays sounds, using WebAudio

*/

new KeyboardDOMView({
    model: compositeSource,
    attributes: {
        from: 12 * 4,
        to: 12 * 6
    }
}).render().$el.appendTo(document.body);

new KeyboardConsoleView({ model: compositeSource });

new KeyboardWebAudioView({ model: compositeSource });

var writer = new KeyboardWriter({}, { source: compositeSource });

window.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.keyCode === 83) {
        e.preventDefault();
        writer.dump();
    }
});