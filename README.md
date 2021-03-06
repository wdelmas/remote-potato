![Logo](https://cdn.pbrd.co/images/GMVq2ib.png)

[![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](./LICENSE.md)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/rating/hifbccioeoaheffkmedjiphppjpcbfeh.svg)](https://chrome.google.com/webstore/detail/remote/hifbccioeoaheffkmedjiphppjpcbfeh)
![Coolness](https://img.shields.io/badge/coolness-OVER_9000-green.svg)

# Remote


| Youtube | Vimeo | Fmovies |
| ------------- | ------------- | ------------ |
| ![demo](./doc/img/youtube.jpg) | ![demo](./doc/img/vimeo.jpg) | ![demo](./doc/img/fmovies.jpg) |


Remote as the name entails, is a remote, but for your browser 🎉

Nowadays, most of the content is available through the browser. 
However your browser is not always accessible straight from your TV,
 so you end up displaying your computer's screen on your TV.

Remote is the missing controller for your browser, 
 especially when you're showing video content on TV.


## Demo

[![demo](./doc/img/remote-video-thumbnail.png)](https://www.youtube.com/watch?v=Di7TS9FbBLU)

## Installing

### Chrome Webstore

Install it directly from the [Chrome Webstore](https://chrome.google.com/webstore/detail/remote/hifbccioeoaheffkmedjiphppjpcbfeh)

### Build it locally

```
npm i                   # Installs dependencies
typings install         # Install typings
npm run build:all       # Builds the server, the client and the extension
npm run server:start    # Launches the server
```

Now you can add the remote to Chrome via [chrome://extensions](chrome://extensions)

Click the Load unpacked extension button and select the folder `build/extensions`

## Using

Scan the QRCode given by the extension when you click on it

... and that's it 😄 Happy controlling !

## Compatibility and features

Compatible with all HTML5 video players with the following features :
- Play
- Pause
- Forwards (+5s)
- Backwards (-5s)
- Volume up (+10)
- Volume down (-10)

Enter and exit fullscreen for:
- [Vimeo](https://vimeo.com/)
- [9anime](https://9anime.to/)
- [fmovies](https://fmovies.se/)
- [AmazonPrime](https://www.primevideo.com/)
- [Canal+](https://www.mycanal.fr/)

## Webapp (mobile first)
- Production: https://remote-potato.herokuapp.com/
- Staging - new design: https://remote-potato-new-design.herokuapp.com/

## Contributors
<table>
    <tr align="center">
        <td>
            <img src="https://avatars0.githubusercontent.com/u/2158425" width="100px"><br>
            <sub>
                <strong>
                    <a href="https://github.com/wdelmas">William Delmas</a>
                </strong>
            </sub><br>
            <a href="https://github.com/wdelmas/remote-potato/commits?author=wdelmas">💻</a>
            📖
            👀
        </td>
        <td>
            <img src="https://avatars1.githubusercontent.com/u/569053" width="100px"><br>
            <sub>
                <strong>
                    <a href="https://github.com/bcldvd">David Boclé</a>
                </strong>
            </sub><br>
            <a href="https://github.com/wdelmas/remote-potato/commits?author=bcldvd">💻</a>
            📖
            👀
        </td>
    </tr>
</table>

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.
Contributions of any kind are welcome!

## Contributing
Changes and improvements are more than welcome!

Feel free to fork and open a pull request. Please make your changes in a specific branch and request to pull into master! If you can, please make sure the remote fully works before sending the PR, as that will help speed up the process.

You can find more informations in the [contributing guide](./CONTRIBUTING.md).

## License

Remote is licensed under the [MIT license](./LICENSE.md).
