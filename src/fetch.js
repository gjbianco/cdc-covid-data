const axios = require('axios');
const fs = require('fs');
const parseCsv = require('csv-parse/lib/sync');

async function fetchData() {
  writeFile(`onset-${new Date().getTime()}`, await getOnsetData());
  writeFile(`state-${new Date().getTime()}`, await getStateData());
}

function writeFile(filename, data) {
  fs.writeFile(`./db/${filename}.json`, JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log(`The file ${filename} was saved!`);
  });
}

async function getOnsetData() {
  const response = await axios.get(
    'https://www.cdc.gov/coronavirus/2019-ncov/us-cases-epi-chart.json'
  );
  const caseRawData = response.data.data.columns;
  return caseRawData[0].map((caseDate, index) => ({
    date: caseDate,
    value: caseRawData[1][index]
  }));
}

async function getStateData() {
  const response = await axios.get(
    'https://www.cdc.gov/coronavirus/2019-ncov/map-data-cases.csv'
  );
  const csvData = response.data;
  const stateRawData = parseCsv(csvData, {
    columns: true,
    skip_empty_lines: true
  });
  return stateRawData; // TODO transform?
}

module.exports = fetchData;

// fetchData();
