'use strict';

var assert = require('assert');
var EventEmitter = require('events');
var util = require('util');

function checkType(obj, type) {
    assert.ifError(typeof obj !== type && new TypeError('Option `' + obj + '` is expected to be a ' + type));
    return obj;
}

function usbDeviceManager(options) {
    function Constructor() {
        EventEmitter.call(this);
        this._devices = {};
    }

    util.inherits(Constructor, EventEmitter);

    var prototype = Constructor.prototype;

    prototype.attach = checkType(options.attach, 'function');
    prototype.detach = checkType(options.detach, 'function');
    prototype._createDevice = checkType(options.createDevice, 'function');

    prototype.mountDevice = function (devPath) {
        if (!this._devices[devPath]) {
            var device = this._createDevice(devPath);
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
            this.emit('unmount', device);
        }
    };

    return Constructor;
}

module.exports = usbDeviceManager;
