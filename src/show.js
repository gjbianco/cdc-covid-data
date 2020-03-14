const PouchDB = require('pouchdb');
const db = new PouchDB('cdc-covid');

async function showData() {
  const data = await db.allDocs({ include_docs: true });
  data.rows.map(dataRow => {
    console.log(JSON.stringify(dataRow));
    console.log('\n');
  });
}
showData();
