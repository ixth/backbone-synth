var model = new KeyboardModel();
new KeyboardDOMView({ model: model }).render().$el.appendTo(document.body);
new KeyboardWebAudioView({ model: model });
