
require(['sandbox-config'], function() {
    require([
        '$',
        'focusManager'
    ],
    function($, FocusManager) {
        var dependencies = {};

        dependencies.$ = $;
        dependencies.FocusManager = FocusManager;

        window.dependencies = dependencies;

        window.parent.postMessage('loaded', '*');
    });
});
