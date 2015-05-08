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

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['$'], factory);
    } else {
        var framework = window.Zepto || window.jQuery;
        factory(framework);
    }
}(function() {


    var FocusManager = function() {
        if (FocusManager.prototype._instance) {
            return FocusManager.prototype._instance;
        }

        FocusManager.prototype._instance = this;
    };


    // Version
    FocusManager.VERSION = '0';


    // the stack (of memories)!
    var stack = [
        // Memory 1 { cache: $(), context: 'thing1' },
        // Memory 2 { cache: $(), context: 'thing1' }
    ];


    /**
     * Initializes descript, ensuring a Singleton instance.
     * @returns {*|FocusManager}
     */
    FocusManager.init = function() {
        return FocusManager.prototype._instance || new FocusManager();
    };


    /**
     * Adds an element to the focus stack
     * @param $element: a single DOM node or jQuery object
     * @param context: a string to give the stored DOM/jQuery object a context
     * @return {jQuery Object}
     */
    FocusManager.prototype.store = function($element, context) {
        validate($element, function($validElem) {
            stack.push({
                cache: $validElem,
                context: context
            });
        });

        return $element;
    };


    /**
     * Pops the stack then sets focus to what was the last element in the
     * stack array.
     * @param context: [option] restores a specific context from the stack
     //                instead of the last memory on the stack
     * @return {jQuery Object}
     */
    FocusManager.prototype.restore = function(context) {
        if (!stack.length) return;

        if (context !== undefined) {

            // Find all the memories we want to restore
            var contextMemories = stack.filter(function(memory, idx) {
                if (memory.context === context) {

                    stack.splice(idx, 1);

                    return memory;
                }
            });

            return this.send(contextMemories[0].cache);
        }

        // else...
        var memory = stack.pop().cache;

        // First pop the stack, then send focus to the returned element
        return this.send(memory);
    };


    /**
     * Resets the stack to an empty array
     */
    FocusManager.prototype.reset = function() {
        stack = [];
    };


    /**
     * Send current focus to an object as the current active (and focused)
     * element. Enables some accessibility features (tabindex).
     * @param $element: a single DOM node or jQuery object
     */
    FocusManager.prototype.send = function($element) {
        validate($element, function($validElem) {
            // Ensure that the target element is focusable
            if (!$validElem.attr('tabindex')) { $validElem.attr('tabindex', '0'); }

            // Focus it
            return $validElem.focus();
        });

        return $element;
    };


    /**
     * Publically reveal the stack, but as a duplicate so it can't be modified
     * @return the stack (as a duplicate)
     */
    FocusManager.prototype.getStack = function() {
        return stack.concat();
    };


    /**
     * Validate an the $element parameter to ensure it is a valid DOM node or
     * jQuery object, and if that's true then perform the callback
     * @param $element: a single DOM node or jQuery object
     * @param callback: a function callback that occurs so long as $element is
     *                  a valid DOM node or jQuery object
     */
    var validate = function($element, callback) {
        // Not doing this because it doesn't cause an error if invalid data is
        // passed to the `$element` parameter
        // if (!$element) { return; }
        try {
            // Let undefined $element pass through this initial check
            if ($element === undefined || $($element)[0].nodeType) {
                // So long as $element is not undefined, execute the callback,
                // to which we pass what we know to be a valid element
                return $element && callback.call($element, $($element));
            }
        } catch (e) {
            throw 'Invalid parameter';
        }
    };

    return FocusManager;
}));
