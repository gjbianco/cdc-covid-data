const CronJob = require('cron').CronJob;
const fetch = require('./fetch');

function run() {
  fetch();
  showNextDate();
}

function showNextDate() {
  console.log('will run again at:', job.nextDate().toString());
}

const job = new CronJob(
  // runs weekdays at 2PM eastern
  // '* * * * * *',
  '0 14 * * MON-FRI',
  run,
  null,
  true,
  'America/New_York'
);

run();
job.start();
