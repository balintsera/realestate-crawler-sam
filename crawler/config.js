module.exports = {
    AWS_REGION: process.env.REGION || 'eu-west-1',
    CRAWLER_CONF_FILE: process.env.CRAWLER_CONF_FILE || 'urls',
    ALWAYS_RUN: process.env.ALWAYS_RUN || true,
    TABLE: process.env.TABLE,
    AWS_DYNAMO_ENDPOINT: process.env.AWS_DYNAMO_ENDPOINT,
  };