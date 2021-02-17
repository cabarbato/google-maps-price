import fs from 'fs';
import 'dotenv/config';
import Papa from 'papaparse';
import LocationSearch from './Location';
import { LocationType } from './typings/Location';

const input_file = process.env.INPUT_FILE! as string,
  file_data = fs.readFileSync(input_file, 'utf8'),
  csv = Papa.parse(file_data, {
    header: true,
    quoteChar: '',
  }),
  header = csv.meta.fields! as string[],
  locations = csv.data,
  Search = new LocationSearch(header);

locations.forEach((location: LocationType) => {
  Search.writeRow(location);
});
