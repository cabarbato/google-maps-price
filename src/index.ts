import 'dotenv/config';
import MapRequest from './MapRequest';
import CsvParser from './CsvParser';
import { Location } from './typings/Location';

const Search = new MapRequest(process.env.API_KEY!),
  Parser = new CsvParser(process.env.DATA_FILE!),
  locations: any = Parser.getRows();

locations.data.forEach((location: Location) => Search.placeSearch(location));