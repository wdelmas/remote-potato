![Logo](https://cdn.pbrd.co/images/GMVq2ib.png)

[![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](./LICENSE.md)
[![David](https://img.shields.io/david/wdelmas/remote.svg)](https://david-dm.org/wdelmas/remote)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/rating/hifbccioeoaheffkmedjiphppjpcbfeh.svg)](https://chrome.google.com/webstore/detail/remote/hifbccioeoaheffkmedjiphppjpcbfeh)
![Coolness](https://img.shields.io/badge/coolness-OVER_9000-green.svg)

# Remote

Remote as the name entails, is a remote, but for your browser 🎉

Nowadays, most of the content is available through the browser. 
However your browser is not always accessible straight from your TV,
 so you end up displaying your computer's screen on your TV.

Remote is the missing controller for your browser, 
 especially when you're showing video content on TV.

## Installing

### Chrome Webstore

Install it directly from the [Chrome Webstore](https://chrome.google.com/webstore/detail/remote/hifbccioeoaheffkmedjiphppjpcbfeh)

### Build it locally

```
npm i               # Installs dependencies
typings install     # Install typings
npm run build:all   # Builds the server, the client and the extension
npm start           # Launches the server
```

Now you can add the remote to Chrome via [chrome://extensions](chrome://extensions)

Click the Load unpacked extension button and select the folder `build/extensions`

## Using

Scan the QRCode given by the extension when you click on it

... and that's it 😄 Happy controlling !


## Contributing
Changes and improvements are more than welcome!

Feel free to fork and open a pull request. Please make your changes in a specific branch and request to pull into master! If you can, please make sure the remote fully works before sending the PR, as that will help speed up the process.

You can find more informations in the [contributing guide](./CONTRIBUTING.md).

## License

Remote is licensed under the [MIT license](./LICENSE.md).