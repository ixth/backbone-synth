var Backbone = require('backbone');
Backbone.$ = require('jquery');

var AppView = require('./views/AppView');
var MIDIControllerSource = require('./models/MIDIControllerSource');
var KeyboardSource = require('./models/KeyboardSource');

var view = new AppView({
    source: new Backbone.Collection([
        new MIDIControllerSource(),
        new KeyboardSource()
    ])
}).render();

view.$el.appendTo(document.body);