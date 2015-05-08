
require(['sandbox-config'], function() {
    require([
        '$',
        'focusManager',
        'accordion',
        'modal',
        'tooltip'
    ],
    function($, FocusManager, Accordion, Modal, Tooltip) {
        var dependencies = {};

        dependencies.$ = $;
        dependencies.FocusManager = FocusManager;

        window.dependencies = dependencies;
        window.FocusManager = FocusManager.init();

        var accordion = new Accordion();
        accordion.init();

        var modal = new Modal();
        modal.init();

        window.parent.postMessage('loaded', '*');
    });
});
