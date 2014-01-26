(function (window, jasmine, require, waitsFor, define) {
    'use strict';

    var debug = true,

        log = function () {
            if (debug && typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined') {
                window.console.log.apply(window.console, arguments);
            }
        },

        requireHelper = {
            mockSuffix: '.mock',
            configMap: {map:{}},
            inject: function (module, map, spy) {
                var done = false;

                log('inject: injecting ' + map + ' when loaded by ' + module);

                this.addMap(module, map);
                this.updateRequireConfig();
                this.defineMock(module, map, spy);

                require.undef(module);

                require([module], function () {
                    log('inject: ' + module + ' loaded');
                    done = true;
                });

                waitsFor(function () {
                    return done;
                });

                return spy;
            },
            mockName: function (module, map) {
                return module + '.' + map + this.mockSuffix;
            },
            addMap: function (module, map) {
                var mockName = this.mockName(module, map);

                if (typeof this.configMap.map[module] === 'undefined') {
                    this.configMap.map[module] = {};
                }
                this.configMap.map[module][map] = mockName;
            },
            updateRequireConfig: function () {
                require.config(this.configMap);
            },
            defineMock: function (module, map, spy) {
                require.undef(this.mockName(module, map));
                define(this.mockName(module, map), spy);
            },
            reload: function (module, callback) {
                var done = false;
                require.undef(module);

                log('reload: requiring: ' + module);

                require([module], function (loadedModule) {
                    callback(loadedModule);
                    log('reload: finished reloading: ' + module);
                    done = true;
                });

                waitsFor(function () {
                    return done;
                });
            }
        };

    jasmine.requireHelper = requireHelper;



}) (window, window.jasmine, window.require, window.waitsFor, window.define);