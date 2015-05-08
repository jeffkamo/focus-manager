define([
    'test-sandbox'
], function(testSandbox) {
    var FocusManager;
    var focusManager;
    var $;

    describe('FocusManager restore', function() {
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

        it('should not throw an error if there is nothing to restore', function() {
            expect(function() { focusManager.restore() }).not.to.throw();
        });

        it('should return the restored node', function() {
            var $button = $('button').first();

            focusManager.store($button);
            expect(focusManager.restore()).to.equal($button);
        });

        it('should remove from the stack the same node that was last added', function() {
            var $buttonFirst = $('button').first();
            var $buttonLast = $('button').last();

            focusManager.store($buttonFirst);
            focusManager.store($buttonLast);
            expect(focusManager.restore()).to.equal($buttonLast);
        });

        it('should remove only one node form the stack', function() {
            var $buttonFirst = $('button').first();
            var $buttonLast = $('button').last();

            focusManager.store($buttonFirst);
            focusManager.store($buttonLast);
            expect(focusManager.restore()).to.be.length(1);
        });

        it('should set a tabindex on the target element if there isn\'t one already', function() {
            $target = $('.accordion__head').first();

            focusManager.store($target);
            focusManager.restore();

            expect($target.attr('tabindex')).to.equal('0');
        });

        it('should leave a tabindex as is if one is already present', function() {
            $target = $('.accordion__head').first().attr('tabindex', '-1');

            focusManager.store($target);
            focusManager.restore();

            expect($target.attr('tabindex')).to.equal('-1');
        });

        // it('should restore a plain DOM node', function() {
        //     focusManager.store($('<div></div>')[0]);
        //     // ...
        // });

        it('should restore the context that\s supplied instead of the default', function(done) {
            $target1 = $('.accordion__heading').first();
            $target2 = $('.accordion__heading').last();

            focusManager.store($target1, 'target1');
            focusManager.store($target2, 'target2');

            expect(focusManager.restore('target1')).to.equal($target1);

            done();
        });
    });
});
