# Instaspect

A small chrome extension to fetch the followers/following of an instagram profile.

## Install 
Clone this repo and follow these steps to import an unpacked extension in chrome:

- Open the Extension Management page by navigating to chrome://extensions.
- The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
- Enable Developer Mode by clicking the toggle switch next to Developer mode.
- Click the LOAD UNPACKED button and select the extension directory.

In case of problems installing the extension consult the [official docs](https://developer.chrome.com/extensions/getstarted).

## Usage 
- Navigate to `instagram.com`.
- Once the page is loaded the icon should turn blue.
- Once you are on an instagram page/ profile click on the icon and a menu should appear with some info and two buttons (Get followers and Get following).
- Clicking the buttons will start the fetching process. Once done a txt file will be downloaded.
- It's that simple.

## NOTE
Due to the graph api [rate limit](https://developers.facebook.com/docs/graph-api/overview/rate-limiting/), the extesion can only make 200 requests per hour.
