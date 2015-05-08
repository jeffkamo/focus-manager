define([
    'test-sandbox'
], function(testSandbox) {
    var FocusManager;
    var focusManager;
    var $;

    describe('FocusManager reset', function() {
        beforeEach(function(done) {
            var setUpComplete = function(iFrame$, dependencies) {
                $ = iFrame$;

                FocusManager = dependencies.FocusManager;
                focusManager = FocusManager.init();
                focusManager.reset();

                done();
            };

            testSandbox.setUp('sandbox', setUpComplete);
        });

        it('should reset the stack back to an empty array', function() {
            focusManager.store($('<div></div>'));
            focusManager.store($('<div></div>'));
            focusManager.store($('<div></div>'));

            focusManager.reset();

            expect(focusManager.getStack()).to.eql([]);
        });
    });
});
