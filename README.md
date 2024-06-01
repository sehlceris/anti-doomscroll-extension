# Anti-Doomscroll WebExtension

Anti-Doomscroll WebExtension helps you avoid spending too much time on distracting websites. When you try to visit a site you've marked as time-wasting, you'll be prompted with a warning and asked to specify your intent and the amount of time you want to spend on that site.

## Features

- Configurable list of restricted sites.
- Customizable time allotment for each site.
- Warning interface to remind you of your intent.

## Installation

### Firefox

1. Go to the [Firefox Add-ons site](https://addons.mozilla.org/).
2. Search for "Anti-Doomscroll WebExtension".
3. Click "Add to Firefox" to install the extension.

### Chrome

1. Go to the [Chrome Web Store](https://chrome.google.com/webstore).
2. Search for "Anti-Doomscroll WebExtension".
3. Click "Add to Chrome" to install the extension.

## Usage

1. Click on the extension icon in your browser toolbar.
2. In the popup, add the domains you want to restrict.
3. When you visit a restricted site, you will see a warning page.
4. Specify the amount of time you want to spend on the site (default is 5 minutes).
5. Click "Proceed" to continue to the site.

## Development

### Prerequisites

- Node.js and npm installed.

### Building the Extension

```shell
git clone https://github.com/yourusername/anti-doomscroll-extension.git
cd anti-doomscroll-extension
npm install
npm build
```
## Loading the Extension Temporarily

### Firefox

1. Open Firefox and navigate to `about:debugging`.
2. Click on "This Firefox" (or "Temporary Extensions").
3. Click on "Load Temporary Add-on" and select any file in your extension directory (e.g., `manifest.json`).

### Chrome

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable "Developer mode" using the toggle in the top-right corner.
3. Click "Load unpacked" and select your extension directory.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
