const life360 = require('../lib/life360');
const $log = require('log4js').getLogger('site');

exports.index = function(req, res, next){
  username = process.env.LIFE360_USERNAME;
  phone = process.env.LIFE360_PHONE;
  password = process.env.LIFE360_PASSWORD;
  if (!password) throw new Error("$LIFE360_PASSWORD not set");

  life360.authenticate(username, password, phone).then(session => {
    return life360.circles(session).then(circles => {
      if (circles.length == 0) {
        throw new Error("No circles in your Life360.");
      }
      let circleId = circles[0].id;
      return life360.circle(session, circleId).then(circle => {
        res.render('site', { life360Members: circle.members });
      });
    })
  })
  .catch(err => {
    next(err);
  });
};
