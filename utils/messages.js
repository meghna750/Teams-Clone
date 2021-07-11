const moment = require('moment');


/**
 * 
 * @param {string} username username of particular user whi sent the message
 * @param {string} text mesage sent by user 
 * @returns username of author of text and time at which text was sent.
 *  time was fetched using moment js
 */
function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}

module.exports = formatMessage;
