Kuzsma Console
--------------

Just playing around...

Web page for displaying family location information on a home console TV.

### How to Run

Set these environment variables:
* `$LIFE360_PHONE` (or `$LIFE360_USERNAME`)
* `$LIFE360_PASSWORD`

```
npm install
npm start
```

### Technology used
* Node 6 and ExpressJS
* Location info from www.life360.com (caveat! uses brittle, non-published API!)

### TODO
* Tests
* Lint
* Google calendar integration
* Maps
* Background images
