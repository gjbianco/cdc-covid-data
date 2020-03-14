const CronJob = require('cron').CronJob;
const fetch = require('./fetch');

const job = new CronJob(
  '* * * * * *',
  () => console.log('You will see this message every second'),
  null,
  true,
  'America/New_York'
);
job.start();
