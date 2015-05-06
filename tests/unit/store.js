define([
    'test-sandbox'
], function(testSandbox) {
    var FocusManager;
    var $;

    describe('FocusManager store', function() {
        beforeEach(function(done) {
            var setUpComplete = function(iFrame$, dependencies) {
                $ = iFrame$;

                FocusManager = dependencies.FocusManager;
                FocusManager.reset();

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
                    expect(function() { FocusManager.store(arg); }).to.throw();
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

        it('stores a new memory to the stack', function() {
            FocusManager.store($('<div></div>'));
            expect(FocusManager.getStack()).to.have.length(1);
        });

        it('can store multiple memories to the stack', function() {
            FocusManager.store($('<div></div>'));
            FocusManager.store($('<div></div>'));
            FocusManager.store($('<div></div>'));
            expect(FocusManager.getStack()).to.have.length(3);
        });

        it('should not add to the stack if the parameter is undefined', function() {
            FocusManager.store();
            expect(FocusManager.getStack()).to.have.length(0);
        });

        it('should return the stored DOM node', function() {
            var node = $('<div></div>');

            expect(FocusManager.store(node)).to.equal(node);
        });
    });
});
