define(function () {
    "use strict";
    describe('test', function () {
        var test, test2Spy;
        beforeEach(function () {
            jasmine.requireHelper.reload('test', function (Test) {
                test = new Test();
            });
        });
        it('should pass', function () {
            expect(true).toEqual(true);
        });
        it('should pass', function () {
            expect(true).toEqual(true);
        });
        it('should pass', function () {
            expect(true).toEqual(true);
        });
        it('should pass', function () {
            expect(true).toEqual(true);
        });
        describe('callTest2', function () {
            beforeEach(function () {
                test2Spy = jasmine.requireHelper.inject('test', 'test2', {testFunc: jasmine.createSpy('testFunc')});
                jasmine.requireHelper.reload('test', function (Test) {
                    test = new Test();
                });

            });
            it('should call test2', function () {
                test.callTest2();

                expect(test.testObj).toEqual(test2Spy);
                expect(test2Spy.testFunc).toHaveBeenCalled();
                expect(test2Spy.testFunc.callCount).toEqual(1);

            });
            it('should call test2', function () {
                test.callTest2();

                expect(test2Spy.testFunc).toHaveBeenCalled();
                expect(test2Spy.testFunc.callCount).toEqual(1);

            });

        });
    });
});