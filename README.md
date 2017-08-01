# https-or-http
https-or-http runs an HTTPS server or, if not possible, an HTTP server.

## Quick start

First you need to add a reference to https-or-http to your application:

```javascript
const httpsOrHttpServer = require('https-or-http');
```

Now you are able to create an HTTPS server or, if not possible, an HTTP server:

```javascript
const app = express();

httpsOrHttpServer({
  app,
  certificateDirectory: '/...',
  ports: {
    https: 8000,
    http: 9000
  }
}, function (err, result) {
  if (err) {
    // ...
  }

  // ...
});
```

*Please note that the directory must contain a `certificate.pem` and a `privateKey.pem` file, otherwise an HTTP server will be started*

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```bash
$ bot
```

## License

The MIT License (MIT)
Copyright (c) 2017 the native web. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
