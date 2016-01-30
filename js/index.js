var Backbone = require('backbone');

var MIDIControllerSource = require('./models/MIDIControllerSource');
var KeyboardSource = require('./models/KeyboardSource');

var KeyboardWebAudioView = require('./views/KeyboardWebAudioView');
var KeyboardDOMView = require('./views/KeyboardDOMView');
var KeyboardConsoleView = require('./views/KeyboardConsoleView');

// Using collection for event aggregation from multiple sources
var compositeSource = new Backbone.Collection();
compositeSource.add(new MIDIControllerSource());
compositeSource.add(new KeyboardSource());

new KeyboardWebAudioView({ model: compositeSource });
new KeyboardDOMView({
    model: compositeSource,
    attributes: {
        from: 12 * 4,
        to: 12 * 6
    }
}).render().$el.appendTo(document.body);
new KeyboardConsoleView({ model: compositeSource });
