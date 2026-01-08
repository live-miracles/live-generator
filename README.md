# Live Generator

This Apps Sheet can be connected to a Google Sheet. Once added there will be a function to create
a Sidebar. In the Sidebar you will be able to login in your YouTube account. And once you fill
a few rows with the stream config parameters it will automatically schedule these live streams.

## Usage

1. Open a Google Sheet.
2. Create a **YT Schedule** and **YT Keys** tabs.
3. Go to **Extensions** -> **Apps Script** and copy-paste the `Code.js`, `YouTube.js`, and `Sidebar.html` files.
4. Go back to Google Sheet and go to **Extensions** -> **Live Generator**. Once you select it a sidebar will show.
5. Click the "Update Stream Keys" button to fetch all the streaming keys from YouTube.
