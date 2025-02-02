const axios = require('axios');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  // http://www.strava.com/oauth/authorize?client_id=76033&response_type=code&redirect_uri=https://ohmyposh.dev/api/auth&approval_prompt=force&scope=read,activity:read

  try {
    const code = (req.query.code || (req.body && req.body.code));
    if (!code) {
      context.res = {
        status: 400
      };
      return;
    }

    var data = {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
    };
    const resp = await axios.post('https://www.strava.com/oauth/token', data);

    context.res = {
      body: resp.data
    };
  } catch (error) {
    context.log(error);
    context.res = {
      body: error,
      status: 500
    };
  }
}
