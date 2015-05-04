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

        it('should return the restored node', function() {
            var $button = $('button').first();

            FocusManager.store($button);
            expect(FocusManager.restore()).to.equal($button);
        });

        it('should remove from the stack the same node that was last added', function() {
            var $buttonFirst = $('button').first();
            var $buttonLast = $('button').last();

            FocusManager.store($buttonFirst);
            FocusManager.store($buttonLast);
            expect(FocusManager.restore()).to.equal($buttonLast);
        });

        it('should remove only one node form the stack', function() {
            var $buttonFirst = $('button').first();
            var $buttonLast = $('button').last();

            FocusManager.store($buttonFirst);
            FocusManager.store($buttonLast);
            expect(FocusManager.restore()).to.be.length(1);
        });

        it('should set a tabindex on the target element if there isn\'t one already', function() {
            $target = $('.accordion__head').first();

            FocusManager.store($target);
            FocusManager.restore();

            expect($target.attr('tabindex')).to.equal('0');
        });

        it('should leave a tabindex as is if one is already present', function() {
            $target = $('.accordion__head').first().attr('tabindex', '-1');

            FocusManager.store($target);
            FocusManager.restore();

            expect($target.attr('tabindex')).to.equal('-1');
        });

        // it('should focus on the restored DOM node', function(done) {
        //     var $button = $('button').first();
        //
        //     $button.focus(function() {
        //         // clearTimeout(errTimeout);
        //         // expect(true).to.be.true;
        //         // done();
        //         // debugger;
        //     });
        //
        //     FocusManager.store($button);
        //
        //     // var errTimeout = setTimeout(function() {
        //     //     expect(false).to.be.true; // Event never fired
        //     //     done();
        //     // }, 1000);
        //
        //     FocusManager.restore();
        // });
    });
});
