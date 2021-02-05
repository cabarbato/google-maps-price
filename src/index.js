import fs from 'fs';
import 'dotenv/config';
import Papa from 'papaparse';
//import authorize from './Auth';
import RunSearch from './MapRequest';
import WriteRow from './CsvWriter';

/* Oauth setup -- Youtube v3 */
/* fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      throw err;
    }

    const Search = new RunSearch();
    authorize(JSON.parse(content), Search.placeSearch);
  }); */

/* API key setup -- for Maps */

const locations = [process.env.SAMPLE_DATA],
  Search = new RunSearch(process.env.API_KEY);

async function searchLocation(location) {
  console.log(await Search.placeSearch(location))
};

for (let i in locations) searchLocation(locations[i]);