# USB Manager Framework for Ruff

This module is used to build usb dynamic device manager for Ruff.

## Supported Engines

* Ruff: >=1.4.0 <1.5.0

## Defining USB Device Manager

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
    }
});
```

### Options

#### `attach([callback])`

This method is used to install the specific usb device driver.

- **callback:** No argument other than a possible error is given to the completion callback. It is optional.

#### `detach([callback])`

This method is used to uninstall the specific usb device driver.

- **callback:** No argument other than a possible error is given to the completion callback. It is optional.

#### `createDevice(devPath)`

This method is used to check whether the `devPath` belongs to the specific usb device.

It returns `null` when `devPath` does not belong to the specific usb device, otherwise returns one instance of the specific usb device.

### Extended Methods

### `mountDevice`

This method is used to emit `mount` event when one specific usb device is pluged into the system.

### `unmountDevice`

This method is used to emit `unmount` event when one specific usb device is unpluged from the system.

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

