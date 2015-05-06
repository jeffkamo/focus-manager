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

                done();
            };

            testSandbox.setUp('sandbox', setUpComplete);
        });

        it('should reset the stack back to an empty array', function() {
            FocusManager.store($('<div></div>'));
            FocusManager.store($('<div></div>'));
            FocusManager.store($('<div></div>'));

            FocusManager.reset();

            expect(FocusManager.getStack()).to.eql([]);
        });
    });
});
