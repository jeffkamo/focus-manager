define([
    'test-sandbox'
], function(testSandbox) {
    var FocusManager;
    var focusManager;
    var $;

    describe('FocusManager add', function() {
        beforeEach(function(done) {
            var setUpComplete = function(iFrame$, dependencies) {
                $ = iFrame$;
                FocusManager = dependencies.FocusManager;
                focusManager = FocusManager.init();

                done();
            };

            testSandbox.setUp('sandbox', setUpComplete);
        });

        it('do stuff', function() {
            // focusManager.add('custom', {
            //     src: ['script4', 'script2']
            // });
            //
            // expect(focusManager.get).to.throw;
        });
    });
});
