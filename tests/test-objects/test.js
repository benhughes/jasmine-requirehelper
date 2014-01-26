define(function (require) {
    "use strict";
    var test2 = require('test2');

    return function () {
        return {
            testObj: test2,
            callTest2: function () {
                test2.testFunc();
            }
        };
    };

});