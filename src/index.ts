import 'dotenv/config';
import MapRequest from './MapRequest';
import CsvParser from './CsvParser';
import { Location } from './typings/Location.d';

const Search = new MapRequest(process.env.API_KEY!),
  CSV = new CsvParser(process.env.DATA_FILE!),
  locations: any = CSV.getRows();

async function searchLocation(location: Location) {
  location.price_level = await Search.placeSearch(
      `${location.name} ${location.city}, ${location.state}`
    );
  CSV.writeRows(location);
};

locations.data.forEach((d: Location) => searchLocation(d));