module.exports = {
    AWS_REGION: process.env.AWS_REGION || 'eu-central-1',
    CRAWLER_CONF_FILE: process.env.CRAWLER_CONF_FILE || 'url',
    ALWAYS_RUN: process.env.ALWAYS_RUN || true
  };