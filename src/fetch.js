const axios = require('axios');
const PouchDB = require('pouchdb');
const db = new PouchDB('cdc-covid');

async function fetchData() {
  const response = await axios.get(
    'https://www.cdc.gov/coronavirus/2019-ncov/us-cases-epi-chart.json'
  );
  const caseRawData = response.data.data.columns;
  const transformedData = caseRawData[0].map((caseDate, index) => ({
    date: caseDate,
    value: caseRawData[1][index]
  }));
  transformedData.unshift();
  db.post({
    snapshotData: transformedData,
    date: new Date().getTime()
  });
}

async function showData() {
  const data = await db.allDocs({ include_docs: true });
  data.rows.map(dataRow => {
    console.log(JSON.stringify(dataRow));
    console.log('\n');
  });
}

fetchData();
showData();
