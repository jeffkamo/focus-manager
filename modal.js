// Modal
// ===


// Cache
// ---

var FOCUSABLE_ELEMENTS = 'a[href], area[href], input, select, textarea, button, iframe, object, embed, [tabindex], [contenteditable]';

var $content = $('.content');
var $openButton = $('#openButton');
var $subject = $('#modal');
var $closeButton = $('#closeButton');
var $overlay = $('.overlay');


// Open Modal & Bind
// ---

var openModal = function() {
    // Hide external modal content from screen readers
    $content.attr('aria-hidden', 'true');

    // Ensure external focusable elements are unfocusable
    disableInputs($content);

    // Record current state into the focus stack
    FocusManager.store(this);

    // Send the current focus to the Modal
    FocusManager.send($subject.attr('hidden', null).find('.modal__inner'));
};

$openButton.on('click', openModal);


// Close Modal & Bind
// ---

var closeModal = function() {
    if ($subject.attr('hidden')) return;

    // Un-hide the main content for screenreaders
    $content.attr('aria-hidden', 'false');

    // Restore the focusability of the external focusable elements
    enableInputs($content);

    // Hide the modal
    $subject[0].setAttribute('hidden', '');

    // Return to the last focus status in the stack
    FocusManager.restore();
};

$closeButton.on('click', closeModal);

$overlay.on('click', closeModal);

$(window).keyup(function(e) {
    if (e.keyCode == 27) closeModal();
});


// Focus Lock
// ---

var disableInputs = function($elem) {
    var $focusableElements = $elem.find(FOCUSABLE_ELEMENTS);

    $focusableElements.each(function(_, el) {
        var $el = $(el);
        var currentTabIndex = $el.attr('tabindex') || 0;

        $el
            .attr('data-orig-tabindex', currentTabIndex)
            .attr('tabindex', '-1');
    });
};

var enableInputs = function($elem) {
    $elem.find('[data-orig-tabindex]').each(function(_, el) {
        var $el = $(el);
        var oldTabIndex = parseInt($el.attr('data-orig-tabindex'));

        if (oldTabIndex) {
            $el.attr('tabindex', oldTabIndex);
        } else {
            $el.removeAttr('tabindex');
        }

        $el.removeAttr('data-orig-tabindex');
    });
};
