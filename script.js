// Script Script
// ===


// Cache
// ---

var $openButton = $('#openButton');
var $subject = $('#modal');
var $closeButton = $('#closeButton');
var $overlay = $('.overlay');


// Open Modal Button
// ---

$openButton.on('click', function(){
    // Record current state into the focus stack
    FocusManager.store(this);

    // Send focus to the new state or context
    $subject.removeClass('hidden');
    $subject.find('input').focus();
});

// Close Modal
// ---

$closeButton.on('click', function() {
    $subject.addClass('hidden');

    // Return to the last focus status in the stack
    FocusManager.restore();
});

$overlay.on('click', function() { $closeButton.click(); });

$(window).keyup(function(e) {
    if (e.keyCode != 27) return;

    if (!$subject.hasClass('hidden')) {
        $closeButton.click();
    }
});
