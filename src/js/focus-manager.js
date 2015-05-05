// Medidate
// ===
//
// This is a utility to help make managing user agent focus a little easier! The
// basic premise is that this utility helps keep track of focus history for when
// complex interaction occurs that require focus to move across the DOM in ways
// that make sense visually, but don't make sense in DOM structural.
//
//
// Example Use Cases
// ---
//
// * Clicking a button that opens a Modal. Focus should go to the modal. On
//   close, focus should return to the original button.
// * Opening an accordion. Focus should go to the opened item's content
//   container. On close, focus should return to the original clickable bellow
//   item link.
// * Toolips
// * Complex navigation widgets (i.e. Navitron). Hitting "Back", focus should
//   return to the previous container in the hierarchy tree.
//
// Regardless of the interactions, focus management should be separate and
// agnostic to the structure of the DOM elements.
//
// It is up to the user (or rather, developer) to ensure that the use cases are
// correctly managed, and that focus management states are returned at all
// appropriate times. For example, remember edge-case interactions like "after
// hitting the escape key to close a modal" or "click out of the modal with a
// mouse" should return focus to its appropriate state.
//
//
// TODO
// ---
//
// - [ ] Implement/follow singleton pattern
// - [ ] Remove "Expose!" code at the bottom and just return FocusManager
// - [ ] Implement the correct modular pattern

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            '$'
        ], factory);
    } else {
        var framework = window.Zepto || window.jQuery;
        factory(framework);
    }
}(function() {

    var FocusManager = function() {
        var self = this;

        self.stack = [
            // Memory 1
            // { cache: $(), context: 'thing1' },
            // Memory 2
            // { cache: $(), context: 'thing1' }
        ];

        /**
         * Adds an element to the focus stack
         * @param element: a single DOM node or jQuery object
         * @return {jQuery Object}
         */
        self.store = function($element, context) {
            validate($element, function($validElem) {
                self.stack.push({
                    cache: $validElem,
                    context: context
                });
            });

            return $element;
        };

        /**
         * Pops the stack then sets focus to what was the last element in the
         * stack array.
         * @return {jQuery Object}
         */
        self.restore = function(context) {
            if (!self.stack.length) return;

            if (context !== undefined) {

                // Find all the memories we want to restore
                var contextMemories = self.stack.filter(function(memory, idx) {
                    if (memory.context === context) {

                        self.stack.splice(idx, 1);

                        return memory;
                    }
                });

                return self.send(contextMemories[0].cache);
            }

            // else...
            var memory = self.stack.pop().cache;

            // First pop the stack, then send focus to the returned element
            return self.send(memory);
        };

        /**
         * Resets the stack to an empty array
         */
        self.reset = function() {
            self.stack = [];
        };

        /**
         * Send current focus to an object as the current active (and focused)
         * element. Enables some accessibility features (tabindex).
         */
        self.send = function($element) {
            validate($element, function($validElem) {
                // Ensure that the target element is focusable
                if (!$validElem.attr('tabindex')) { $validElem.attr('tabindex', '0'); }

                // Focus it
                return $validElem.focus();
            });

            return $element;
        };
    };


    // Version
    FocusManager.VERSION = '0';


    // Memory
    var Memory = function(cache, context) {
        this.cache = cache;
        this.context = context;
    };


    // Utilities
    var validate = function($element, callback) {
        // if (!$element) { return; }

        try {
            // Let undefined $element pass through this initial check
            if ($element === undefined || $($element)[0].nodeType) {
                // So long as $element is not undefined, execute the callback,
                // to which we pass what we know to be a valid element
                return $element && callback.call($element, $($element));
            }
        } catch (e) {
            throw 'Invalid value passed to $element parameter';
        }
    };


    // Expose!
    var focusManager = new FocusManager();
    window.FocusManager = focusManager; // temporary solution, probably needs to change for Require to work
    return focusManager;

}));
