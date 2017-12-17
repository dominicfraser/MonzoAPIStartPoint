> Start point for using the Monzo API locally.

This start point sets you up with working and secure calls to the Monzo API for your accounts, balance, and transactions, ready for UI formatting, or further extension.

Monzo warn that:
> The Monzo API is not yet suitable for building public applications.
> You may only connect to your own account or those of a small set of users you explicitly whitelist.

More information can be found in the Monzo API docs, here: https://monzo.com/docs/#introduction.

## To Setup
### Dependencies
This start point assumes you are using Node.js and npm.

You will also need to have created a Monzo developer client.  This can be done at https://developers.monzo.com/. Sign in, choose the 'Clients'/ 'New OAuth Client' options and name and create a new client.  Give it whatever name and description you wish, but add `http://localhost/authorised` in `Redirect URLs`.  Take note of the `Client ID` and `Client secret`.  You will need to add these to your `.env` file during setup.

### Setup
To setup use:
```
$ npm install
```
in the root directory.

Create a `.env` file following the guide in `.env-sample` and add your `CLIENT_ID`, `CLIENT_SECRET`, and `REDIRECT_URI`.  Make up a personal `SESSION_SECRET` and add this too.

## To Run
To run you will leave your express server, and webpack module bundler running in two separate terminal windows.

In main directory:
```
$ sudo npm start
```
and enter your device password. Next, in the client directory:
```
$ npm run webpack
```

## To View
To view and interact with your app go to
```
localhost
```
in a browser window.

### What is going on?
* `sudo npm start` is required as the Monzo API breaks if a `Redirect URI` uses `localhost:port`. Port 80, localhost, can be used to get around this, but it requires sudo permissions.
* `.env`: 'Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.' This keeps your credentials secure in an open source environment.
* Security. Monzo API calls require an access token. To divorce this access token from client side visibility server side routes are used to proxy API requests, with the Monzo access token stored within the Express session. Other methods exist, this is simply one I wished to try.

//TODO
* refactor API router requests
* replace XML Promises with fetch
* refactor creating State
* access .env on client side
* server side rendering
