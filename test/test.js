'use strict';
var usbDeviceManager = require('../src/index.js');
var assert = require('assert');

require('t');

describe('Test for usb-manager', function () {
    it('test should throw error if `attach` is not a function', function (done) {
        var foo;
        assert.throws(function () {
            usbDeviceManager({
                attach: foo,
                detach: function () { },
                createDevice: function () { }
            });
        }, TypeError);
        done();
    });

    it('test should throw error if `detach` is not a function', function (done) {
        var foo;
        assert.throws(function () {
            usbDeviceManager({
                attach: function () { },
                detach: foo,
                createDevice: function () { }
            });
        }, TypeError);
        done();
    });

    it('test should throw error if `createDevice` is not a function', function (done) {
        var foo;
        assert.throws(function () {
            usbDeviceManager({
                attach: function () { },
                detach: function () { },
                createDevice: foo
            });
        }, TypeError);
        done();
    });

    it('test should emit `mount` event when invoke `mountDevice` method and a device is created', function (done) {
        var ManagerConstructor = usbDeviceManager({
            attach: function () {
            },
            detach: function () {
            },
            createDevice: function () {
                return {};
            }
        });

        var manager = new ManagerConstructor();
        manager.on('mount', function () {
            done();
        });
        manager.mountDevice('/sys/devices/foo');
    });

    it('test should not emit `mount` event when invoke `mountDevice` method and no device is created', function (done) {
        var ManagerConstructor = usbDeviceManager({
            attach: function () {
            },
            detach: function () {
            },
            createDevice: function () {
                return null;
            }
        });

        var manager = new ManagerConstructor();
        manager.on('mount', function () {
            done();
        });
        setTimeout(done, 100);
        manager.mountDevice('/sys/devices/foo');
    });

    it('test should emit `unmount` event when `unmountDevice` method is invoked with an existed devPath', function (done) {
        var ManagerConstructor = usbDeviceManager({
            attach: function () {
            },
            detach: function () {
            },
            createDevice: function () {
                return {};
            }
        });

        var manager = new ManagerConstructor();
        manager.on('unmount', function () {
            done();
        });
        manager.mountDevice('/sys/devices/foo');
        manager.unmountDevice('/sys/devices/foo');
    });

    it('test should not emit `unmount` event when `unmountDevice` method is invoked with an unexisted devPath', function (done) {
        var ManagerConstructor = usbDeviceManager({
            attach: function () {
            },
            detach: function () {
            },
            createDevice: function () {
                return null;
            }
        });

        var manager = new ManagerConstructor();
        manager.on('unmount', function () {
            done();
        });
        setTimeout(done, 100);
        manager.mountDevice('/sys/devices/foo');
        manager.unmountDevice('/sys/devices/bar');
    });

    it('test should emit `mount` event when invoke `mountDevice` method and arguments of  ManagerConstructor is not undefined', function (done) {
        var ManagerConstructor = usbDeviceManager({
            attach: function () {
            },
            detach: function () {
            },
            createDevice: function (devPath, options) {
                return options ? {} : null;
            }
        });

        var manager = new ManagerConstructor({});
        manager.on('mount', function () {
            done();
        });
        manager.mountDevice('/sys/devices/foo');
    });

    it('test should not emit `mount` event when invoke `mountDevice` method and arguments of  ManagerConstructor is undefined', function (done) {
        var ManagerConstructor = usbDeviceManager({
            attach: function () {
            },
            detach: function () {
            },
            createDevice: function (devPath, options) {
                return options ? {} : null;
            }
        });

        var manager = new ManagerConstructor();
        manager.on('mount', function () {
            done();
        });
        setTimeout(done, 100);
        manager.mountDevice('/sys/devices/foo');
    });
});
