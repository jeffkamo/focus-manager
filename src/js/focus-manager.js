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
// Feature Wishlist
// ---
//
// - [ ] Awareness of active vs. non-active containers
// - [ ] Unfocusable Manager (make things unfocusable, i.e. the body when a
//       modal is open)
// - [ ] Input Device Manager (keyCode maps)
// - [ ] Default collection of interaction events (click, escabe, blur, etc.)
// - [ ] Mobile Screen Reader Helpers?
// - [ ] Custom, pluginable events? (before/after focus and before/after blur)

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

    var FocusManager = {
        stack: [],

        /**
         * Adds an element to the focus stack
         * @param element: a single DOM node or jQuery object
         * @return {jQuery Object}
         */
        store: function($element) {
            validate($element, function() {
                this.stack.push($($element));
            });

            return $element;
        },

        /**
         * Pops the stack then sets focus to what was the last element in the
         * stack array.
         * @return {jQuery Object}
         */
        restore: function() {
            if (this.stack.length)
                // First pop the stack, then send focus to the returned element
                return this.send(this.stack.pop());
        },

        /**
         * Resets the stack to an empty array
         */
        reset: function() {
            this.stack = [];
        },

        /**
         * Send current focus to an object as the current active (and focused)
         * element. Enables some accessibility features (tabindex).
         */
        send: function($element) {
            validate($element, function() {
                // Ensure that the target element is focusable
                if (!$element.attr('tabindex')) $element.attr('tabindex', '0');

                // Focus it
                return $element.focus();
            });

            return $element;
        },
    };

    // Version
    FocusManager.VERSION = '0';


    // Utilities
    var validate = function($element, callback) {
        try {
            if ($element === undefined || $($element)[0].nodeType) {
                return $element && callback.apply(FocusManager);
            }
        }

        catch (e) {
            throw 'Invalid value passed to $element parameter';
        }
    };


    // Expose!
    window.FocusManager = FocusManager; // temporary solution, probably needs to change for Require to work
    return FocusManager;

}));
