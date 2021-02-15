import fs from 'fs';
import 'dotenv/config';
import Papa from 'papaparse';
import LocationSearch from './Location';
import { LocationType } from './typings/Location';
import { schema } from '../data/schema';

const file = process.env.INPUT_FILE! as string,
  Search = new LocationSearch(schema! as string[]);

Papa.parse(fs.readFileSync(file, 'utf8'), {
  header: true,
}).data.forEach((location: LocationType) => Search.writeRow(location));
