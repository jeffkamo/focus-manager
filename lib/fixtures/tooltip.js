// Tooltip
// ===

(function(focusManager) {
    // Cache
    // ---

    var tooltip = [
        $('#tooltip1')
    ];
    var $openTooltip1 = $('#openTooltip1');
    var $closeTooltip1 = $('#closeTooltip1');


    // Open Tooltip
    // ---

    var openTooltip = function(idx) {
        idx = idx - 1;

        // Reveal the modal
        tooltip[idx].attr('hidden', null);

        // Record current state into the focus stack
        focusManager.store(this);

        // Send the current focus to the Tooltip
        focusManager.send(tooltip[idx]);
    };

    $openTooltip1.on('click', function(){
        openTooltip.call(this, 1)
    });


    // Close Tooltip
    // ---

    var closeTooltip = function(idx) {
        idx = idx - 1;

        if (tooltip[idx].attr('hidden')) return;

        // Hide the tooltip
        tooltip[idx][0].setAttribute('hidden', '');

        // Return to the previous focus element in the stack
        focusManager.restore();
    };

    $closeTooltip1.on('click', closeTooltip.bind(this, 1));
})(FocusManager.init());
