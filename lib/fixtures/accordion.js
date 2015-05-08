// Accordion
// ===

(function(focusManager) {

    // Cache
    // ---

    var CLASSES = {
        'accordion': 'accordion',
        'accordionItem': 'accordion__item',
        'accordionHead': 'accordion__head',
        'accordionHeading': 'accordion__heading',
        'accordionBody': 'accordion__body',
        'openButton': 'js-open-accordion',
        'isOpen': 'is-open',
        'isClosed': 'is-closed',
    };

    var EVENTS = {
        'change': 'accordion:change',
        'open': 'accordion:open',
        'close': 'accordion:close'
    };


    // Accordion
    // ---

    var Accordion = function() {
        var self = this;

        self.items = [];
        self.container;

        // Constructor
        self.init = function($container) {
            addContainer($container);
            addItems();
        };

        // Add container
        var addContainer = function($container) {
            self.container = $container ||  $('.' + CLASSES.accordion);
        };

        // Add Items
        var addItems = function() {
            self.container.find('.' + CLASSES.accordionItem).each(function(idx, item) {
                var accordionItem = new Item($(item));
                self.items.push(accordionItem);
            });
        };
    };


    // Item
    // ---

    var Item = function($item) {
        var self = this;

        self.$item = $item;
        self.$button = $item.find('.' + CLASSES.openButton);
        self.$head = $item.find('.' + CLASSES.accordionHeading);
        self.$body = $item.find('.' + CLASSES.accordionBody);

        // State Checker
        self.isOpen = function() {
            return self.$body.hasClass(CLASSES.isOpen)
        };

        // Click Handler
        self.$button.click(function() {
            self.$item.trigger(EVENTS.change);
        });

        // "Escape" Key Handler
        self.$item.keyup(function(e) {
            if (e.keyCode == 27 && self.isOpen()) {
                self.$item.trigger(EVENTS.change);

                e.stopPropagation();
            }
        });

        // Open Event Listener
        self.$item.on(EVENTS.open, function() {
            focusManager.store(self.$head, self.$head.text());

            // yup, I'm being lazy... I want this to gaurantee that this will
            // happen after the `is-open` class is applied to `self.$body` (see
            // the `.toggleClass` in the `EVENTS.change` event handler below)
            setTimeout(function() {
                focusManager.send(self.$body);
            }, 50);
        });

        // Close Event Listener
        self.$item.on(EVENTS.close, function() {
            focusManager.restore(self.$head.text());
        });

        // Change Event Listener
        self.$item.on(EVENTS.change, function() {
            if (self.isOpen()) {
                self.$item.trigger(EVENTS.close);
            } else {
                self.$item.trigger(EVENTS.open);
            }

            self.$body.toggleClass(CLASSES.isOpen);
        });
    };


    // Init
    // ---

    var accordion = new Accordion;
    accordion.init();

})(FocusManager.init());
