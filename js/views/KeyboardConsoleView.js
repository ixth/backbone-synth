var KeyboardAbstractView = require('views/KeyboardAbstractView');

/*
    Minimal impact, needed to implement new view — override play and stop methods
*/
module.exports = KeyboardAbstractView.extend({
    play: function (tone) {
        console.log('play:%s', tone);
    },

    stop: function (tone) {
        console.log('stop:%s', tone);
    }
});
