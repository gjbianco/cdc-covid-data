const axios = require('axios');
const fs = require('fs');

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

  const filename = new Date().getTime();
  fs.writeFile(
    `./db/${filename}.json`,
    JSON.stringify(transformedData),
    function(err) {
      if (err) {
        return console.log(err);
      }
      console.log(`The file ${filename} was saved!`);
    }
  );
}

module.exports = fetchData;

// fetchData();
