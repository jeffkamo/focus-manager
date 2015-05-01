define([
    'test-sandbox'
], function(testSandbox) {
    var FocusManager;
    var $;

    describe('FocusManager restore', function() {
        beforeEach(function(done) {
            var setUpComplete = function(iFrame$, dependencies) {
                $ = iFrame$;

                FocusManager = dependencies.FocusManager;
                FocusManager.reset();

                done();
            };

            testSandbox.setUp('sandbox', setUpComplete);
        });

        it('should not throw an error if there is nothing to restore', function() {
            expect(function() { FocusManager.restore() }).not.to.throw();
        });

        // it('should focus on the restored DOM node', function() {
        //
        // });

        // it('should remove the restored DOM node from the stack', function() {
        //
        // });
    });
});
