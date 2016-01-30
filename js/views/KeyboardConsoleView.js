var KeyboardAbstractView = require('views/KeyboardAbstractView');

module.exports = KeyboardAbstractView.extend({
    play: function (tone) {
        console.log('play:%s', tone);
    },

    stop: function (tone) {
        console.log('stop:%s', tone);
    }
});
