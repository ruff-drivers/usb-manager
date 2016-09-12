'use strict';

var assert = require('assert');
var EventEmitter = require('events');
var util = require('util');

function checkType(obj, type) {
    assert.ifError(typeof obj !== type && new TypeError('Option `' + obj + '` is expected to be a ' + type));
    return obj;
}

function callEach(obj, func) {
    var keys = Object.keys(obj);
    if (keys.length) {
        keys.forEach(function (key) {
            var value = obj[key];
            if (value) {
                func(value);
            }
        });
    }
}

function usbDeviceManager(specificManager) {
    function Constructor(options) {
        EventEmitter.call(this);
        this._devices = {};
        this._options = options || {};
    }

    util.inherits(Constructor, EventEmitter);

    var prototype = Constructor.prototype;

    prototype.attach = checkType(specificManager.attach, 'function');
    var specificManagerDetach = checkType(specificManager.detach, 'function');
    prototype._createDevice = checkType(specificManager.createDevice, 'function');
    if (specificManager.cleanupDevice !== undefined) {
        prototype._cleanupDevice = checkType(specificManager.cleanupDevice, 'function');
        prototype.detach = function () {
            callEach(this._devices, this._cleanupDevice.bind(this));
            specificManagerDetach.apply(this, arguments);
        };
    } else {
        prototype._cleanupDevice = function () {};
        prototype.detach = specificManagerDetach;
    }

    prototype.mountDevice = function (devPath) {
        if (!this._devices[devPath]) {
            var device = this._createDevice(devPath, this._options);
            if (device) {
                this._devices[devPath] = device;
                this.emit('mount', device);
            }
        }
    };

    prototype.unmountDevice = function (devPath) {
        var device = this._devices[devPath];
        if (device) {
            delete this._devices[devPath];
            this._cleanupDevice(device);
            this.emit('unmount', device);
        }
    };

    return Constructor;
}

module.exports = usbDeviceManager;
