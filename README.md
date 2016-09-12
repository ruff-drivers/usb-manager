# USB Manager Framework for Ruff

This module is used to build USB dynamic device manager for Ruff.

## Supported Engines

* Ruff: >=1.4.0 <1.6.0

## Defining USB Device Manager

You can write your own USB device driver with the following framework.

```js
var usbManager = require('usb-manager');

module.exports = usbManager({
    attach: function (callback) {
        // ...
    },

    detach: function (callback) {
        // ...
    },

    createDevice: function (devPath) {
        // ...
    },

    cleanupDevice: function (device) {
        // ...
    }
});
```

### Options

#### `attach(callback)`

This method will be invoked when this module is installed. Some initialization could be done here, for example, install a specific system driver if needed.

- **callback:** No argument other than a possible error is given to the completion callback.

#### `detach(callback)`

This method will be invoked when the USB module is detached. Some cleanup could be done here, for example, uninstall the specific usb device driver.

- **callback:** No argument other than a possible error is given to the completion callback.

#### `createDevice(devPath, options)`

This method will be invoked when new device is plugged into USB interface. You should check whether the `devPath` belongs to the your own usb device.

It returns `null` when `devPath` does not belong to your usb device, otherwise returns one instance of the specific usb device.

The `options` is the optional arguments used to construct the instance of the specific usb device. The application developer could pass default `options` with constructor.

#### `cleanupDevice(device)`

This method will be invoked when the device is unplugged from USB interface. Some cleanup could done here. The method is optional.

- **device:** The device object which is unplugged from the system.

### Extended Methods

#### `mountDevice`

This method is used to emit `mount` event when one specific usb device is plugged into the system.

#### `unmountDevice`

This method is used to emit `unmount` event when one specific usb device is unplugged from the system.

## Contributing

Contributions to this project are warmly welcome. But before you open a pull request, please make sure your changes are passing code linting and tests.

You will need the latest [Ruff SDK](https://ruff.io/) to install rap dependencies and then to run tests.

### Installing Dependencies

```sh
npm install
rap install
```

### Running Tests

```sh
npm test
```

## License

The MIT License (MIT)

Copyright (c) 2016 Nanchao Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.