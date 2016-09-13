/*!
 * Copyright (c) 2016 Nanchao Inc.
 * All rights reserved.
 */

'use strict';
var usbDeviceManager = require('../src/index.js');
var assert = require('assert');
var mock = require('ruff-mock');
var anyMock = mock.anyMock;
var verify = mock.verify;
var any = mock.any;
var when = mock.when;

require('t');

describe('Test for usb-manager', function () {
    var specificManager;
    var ManagerConstructor;
    var manager;

    it('test should throw error if `attach` is not a function', function (done) {
        specificManager = mock({
            attach: null,
            detach: Function,
            createDevice: Function,
            cleanupDevice: Function
        });

        assert.throws(function () {
            usbDeviceManager(specificManager);
        }, TypeError);
        done();
    });

    it('test should throw error if `detach` is not a function', function (done) {
        specificManager = mock({
            attach: Function,
            detach: null,
            createDevice: Function,
            cleanupDevice: Function
        });

        assert.throws(function () {
            usbDeviceManager(specificManager);
        }, TypeError);
        done();
    });

    it('test should throw error if `createDevice` is not a function', function (done) {
        specificManager = mock({
            attach: Function,
            detach: Function,
            createDevice: null,
            cleanupDevice: Function
        });

        assert.throws(function () {
            usbDeviceManager(specificManager);
        }, TypeError);
        done();
    });

    it('test should throw error if `cleanupDevice` is not a function', function (done) {
        specificManager = mock({
            attach: Function,
            detach: Function,
            createDevice: Function,
            cleanupDevice: null
        });

        assert.throws(function () {
            usbDeviceManager(specificManager);
        }, TypeError);
        done();
    });

    it('test should emit `mount` event when invoke `mountDevice` method and a device is created', function (done) {
        specificManager = mock({
            attach: Function,
            detach: Function,
            createDevice: Function,
            cleanupDevice: Function
        });

        var mountedDev = anyMock();

        when(specificManager).createDevice('/sys/devices/foo', any).thenReturn(mountedDev);

        ManagerConstructor = usbDeviceManager(specificManager);
        manager = new ManagerConstructor();
        manager.on('mount', function (dev) {
            assert.deepEqual(dev, mountedDev);
            done();
        });
        manager.mountDevice('/sys/devices/foo');
    });

    it('test should not emit `mount` event when invoke `mountDevice` method and no device is created', function (done) {
        specificManager = mock({
            attach: Function,
            detach: Function,
            createDevice: Function,
            cleanupDevice: Function
        });

        when(specificManager).createDevice('/sys/devices/foo', any).thenReturn(null);

        ManagerConstructor = usbDeviceManager(specificManager);
        manager = new ManagerConstructor();
        manager.on('mount', function () {
            done();
        });
        setTimeout(done, 100);
        manager.mountDevice('/sys/devices/foo');
    });

    it('test should emit `unmount` event when `unmountDevice` method is invoked with an existed devPath', function (done) {
        specificManager = mock({
            attach: Function,
            detach: Function,
            createDevice: Function,
            cleanupDevice: Function
        });

        var mountedDev = anyMock();
        when(specificManager).createDevice('/sys/devices/foo', any).thenReturn(mountedDev);
        when(specificManager).cleanupDevice(mountedDev).thenReturn();

        ManagerConstructor = usbDeviceManager(specificManager);
        manager = new ManagerConstructor();
        manager.on('unmount', function (dev) {
            assert.deepEqual(dev, mountedDev);
            done();
        });
        manager.mountDevice('/sys/devices/foo');
        manager.unmountDevice('/sys/devices/foo');
    });

    it('test should not emit `unmount` event when `unmountDevice` method is invoked with an unexisted devPath', function (done) {
        specificManager = mock({
            attach: Function,
            detach: Function,
            createDevice: Function,
            cleanupDevice: Function
        });

        var mountedDev = anyMock();
        when(specificManager).createDevice('/sys/devices/foo', any).thenReturn(mountedDev);

        ManagerConstructor = usbDeviceManager(specificManager);
        manager = new ManagerConstructor();

        manager.on('unmount', function () {
            done();
        });
        setTimeout(done, 100);
        manager.mountDevice('/sys/devices/foo');
        manager.unmountDevice('/sys/devices/bar');
    });

    it('test should emit `mount` event when invoke `mountDevice` method and arguments of ManagerConstructor is correct', function (done) {
        specificManager = mock({
            attach: Function,
            detach: Function,
            createDevice: Function,
            cleanupDevice: Function
        });

        var mountedDev = anyMock();
        var devOptions = anyMock();
        when(specificManager).createDevice('/sys/devices/foo', devOptions).thenReturn(mountedDev);

        ManagerConstructor = usbDeviceManager(specificManager);
        manager = new ManagerConstructor(devOptions);

        manager.on('mount', function () {
            done();
        });
        manager.mountDevice('/sys/devices/foo');
    });

    it('test should not emit `mount` event when invoke `mountDevice` method and arguments of ManagerConstructor is wrong', function (done) {
        specificManager = mock({
            attach: Function,
            detach: Function,
            createDevice: Function,
            cleanupDevice: Function
        });

        var devOptions = anyMock();
        when(specificManager).createDevice('/sys/devices/foo', devOptions).thenReturn(null);

        ManagerConstructor = usbDeviceManager(specificManager);
        manager = new ManagerConstructor(devOptions);

        manager.on('mount', function () {
            done();
        });
        setTimeout(done, 100);
        manager.mountDevice('/sys/devices/foo');
    });

    it('test should invoke `cleanupDevice` when invoke `unmountDevice` method', function (done) {
        specificManager = mock({
            attach: Function,
            detach: Function,
            createDevice: Function,
            cleanupDevice: Function
        });

        var mountedDev = anyMock();
        when(specificManager).createDevice('/sys/devices/foo', any).thenReturn(mountedDev);
        when(specificManager).cleanupDevice(mountedDev).thenReturn();

        ManagerConstructor = usbDeviceManager(specificManager);
        manager = new ManagerConstructor();
        manager.on('unmount', function (dev) {
            assert(dev, mountedDev);
            done();
        });
        manager.mountDevice('/sys/devices/foo');
        manager.unmountDevice('/sys/devices/foo');
    });

    it('test should invoke `cleanupDevice` when invoke `detach` method', function (done) {
        specificManager = mock({
            attach: Function,
            detach: Function,
            createDevice: Function,
            cleanupDevice: Function
        });

        var mountedDev = anyMock();
        when(specificManager).createDevice('/sys/devices/foo', any).thenReturn(mountedDev);
        when(specificManager).cleanupDevice(mountedDev).thenReturn();
        when(specificManager).detach().thenReturn();

        ManagerConstructor = usbDeviceManager(specificManager);
        manager = new ManagerConstructor();
        manager.mountDevice('/sys/devices/foo');
        manager.detach();
        verify(specificManager).detach();
        done();
    });
});
