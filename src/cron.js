const CronJob = require('cron').CronJob;
const fetch = require('./fetch');

const job = new CronJob(
  '* * * * * *',
  () => fetch(),
  null,
  true,
  'America/New_York'
);
job.start();
