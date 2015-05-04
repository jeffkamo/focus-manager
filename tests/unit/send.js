define([
    'test-sandbox'
], function(testSandbox) {
    var FocusManager;
    var focusManager;
    var $;

    describe('FocusManager send', function() {
        beforeEach(function(done) {
            var setUpComplete = function(iFrame$, dependencies) {
                $ = iFrame$;

                FocusManager = dependencies.FocusManager;

                done();
            };

            testSandbox.setUp('sandbox', setUpComplete);
        });

        it('should not throw an error if no element parameter is supplied', function() {
            expect(function() { FocusManager.store() }).not.to.throw();
        });

        it('should not throw an error if a DOM node is supplied', function() {
            expect(function() { FocusManager.store($('<a href="#">dom node</a>')[0]) }).not.to.throw();
        });

        it('should not throw an error if a jQuery object is supplied', function() {
            expect(function() { FocusManager.store($('<a href="#">dom node</a>')) }).not.to.throw();
        });

        it('should throw an error if any invalid data type is supplied', function() {
            var store = function() {
                $.each(arguments, function(arg) {
                    expect(function() { FocusManager.send(arg); }).to.throw();
                });
            };

            store(
                1, 0,
                true, false,
                NaN,
                'string',
                [], {},
                function(){}
            );
        });

        it('should set a tabindex on the target element if there isn\'t one already', function() {
            $target = $('#tooltip1');

            FocusManager.send($target);

            expect($target.attr('tabindex')).to.equal('0');
        });

        it('should leave a tabindex as is if one is already present', function() {
            $target = $('#tooltip1').attr('tabindex', -1);

            FocusManager.send($target);

            expect($target.attr('tabindex')).to.equal('-1');
        });

        it('should return the element focus was sent to', function() {
            $target = $('#tooltip1').attr('tabindex', -1);

            expect(FocusManager.send($target)).to.equal($target);
        });
    });
});
