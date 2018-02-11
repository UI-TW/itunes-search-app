## Pre-requisite
[Node](https://nodejs.org/en/)
[npm](https://www.npmjs.com/)
We are using node v8.9

## To run application
- nvm use (If you are using nvm to manage node version)
- npm install
- npm start (To start the application)
- Open http://localhost:3040 in browser

## About the app
- This is a small app used to search albums and add upvote them.

## Where do we go from here?

- Its a simple app, like any other website. Will be converting it 
to a PWA compliant one by following the below steps.

### Step 1

- Add service worker

  - Register service worker
  - Add service worker lifecycle events

### Step 2

- App Shell

  - Pre-cache minimal assets required
  - Add noscript
  - Add offline indication

### Step 3

- Push notification
  - Add subscribe icon to app
  	- Add in template
  	- Create component
  	- Include component
  - Fetch server identification (VAPID) key
  - Add subscribe action
  - Push event
  	- Add push event handler
  	- Configure more options in notification
  	- Add notification click action
  	
### Step 4

- Sync
  - Add sync handler
  - Sync on upvote
  	- Post message to service worker with upvoted item
  	- Perform upvote sync with server

### Step 5

- Dynamic Caching
  - Caching assets from cdn
  - Caching api responses

### Step 6

- Manifest
  - Add manifest.json
  - Add to home screen (beforeinstallprompt) 
  - Add spash screen (out of the box)
  
## Note

- Each step above is present inside a separate branch.
- Checkout the branches and start implementing the respective feature.
- If you need any assistance, each branch has a solution folder for reference
- The final pwa compliant app is present in 'pwa' branch.
  

  	
