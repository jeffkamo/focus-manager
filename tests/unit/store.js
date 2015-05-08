define([
    'test-sandbox'
], function(testSandbox) {
    var FocusManager;
    var focusManager;
    var $;

    describe('FocusManager store', function() {
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

        it('should not throw an error if no element parameter is supplied', function() {
            expect(function() { focusManager.store() }).not.to.throw();
        });

        it('should not throw an error if a DOM node is supplied', function() {
            expect(function() { focusManager.store($('<a href="#">dom node</a>')[0]) }).not.to.throw();
        });

        it('should not throw an error if a jQuery object is supplied', function() {
            expect(function() { focusManager.store($('<a href="#">dom node</a>')) }).not.to.throw();
        });

        it('should throw an error if any invalid data type is supplied', function() {
            var store = function() {
                $.each(arguments, function(arg) {
                    expect(function() { focusManager.store(arg); }).to.throw();
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
            focusManager.store($('<div></div>'));
            expect(focusManager.getStack()).to.have.length(1);
        });

        it('can store multiple memories to the stack', function() {
            focusManager.store($('<div></div>'));
            focusManager.store($('<div></div>'));
            focusManager.store($('<div></div>'));
            expect(focusManager.getStack()).to.have.length(3);
        });

        it('should not add to the stack if the parameter is undefined', function() {
            focusManager.store();
            expect(focusManager.getStack()).to.have.length(0);
        });

        it('should return the stored DOM node', function() {
            var node = $('<div></div>');

            expect(focusManager.store(node)).to.equal(node);
        });
    });
});
