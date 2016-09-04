'use strict';

var assert = require('assert');
var EventEmitter = require('events');
var util = require('util');

function checkType(obj, type) {
    assert.ifError(typeof obj !== type && new TypeError('Option `' + obj + '` is expected to be a ' + type));
    return obj;
}

function usbDeviceManager(specificManager) {
    function Constructor(options) {
        EventEmitter.call(this);
        this._devices = {};
        this._options = options;
    }

    util.inherits(Constructor, EventEmitter);

    var prototype = Constructor.prototype;

    prototype.attach = checkType(specificManager.attach, 'function');
    prototype.detach = checkType(specificManager.detach, 'function');
    prototype._createDevice = checkType(specificManager.createDevice, 'function');

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
            this.emit('unmount', device);
        }
    };

    return Constructor;
}

module.exports = usbDeviceManager;
