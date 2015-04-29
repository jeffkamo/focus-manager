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

    var FocusManager = {};
    var stack = [];
    var activeElem;

    /**
     * Adds an element to the focus stack
     * @param elem: a single DOM node or jQuery object
     * @return {jQuery Object}
     */
    FocusManager.store = function(elem) {
        elem && stack.push($(elem));

        return elem;
    };

    /**
     * Pops the stack then sets focus to what was the last element in the
     * stack array.
     * @return {jQuery Object}
     */
    FocusManager.restore = function() {
        return stack.pop().focus();
    };

    /**
     * Send current focus to an object as the current active (and focused)
     * element. Enables some accessibility features (tabindex).
     */
    FocusManager.send = function(elem) {
        if (!elem) return;

        var $elem = $(elem);

        // Ensure that the target element is focusable
        if (!$elem.attr('tabindex')) $elem.attr('tabindex', '0')

        // Focus it
        activeElem = $elem.focus();
    };

    window.FocusManager = FocusManager; // temporary solution, probably needs to change for Require to work

    return FocusManager;
}));
