import fs from 'fs';
import 'dotenv/config';
import { Client } from '@googlemaps/google-maps-services-js';
import { APIError } from './Error';
import { LocationType, PlaceIdType } from './typings/Location';

export default class LocationSearch {
  key: string;
  file: string;
  header: string[];
  client: Client;

  constructor(header: string[]) {
    this.header = [...header, 'price_level'];
    this.key = process.env.API_KEY! as string;
    this.file = process.env.OUTPUT_FILE! as string;
    this.client = new Client({});

    fs.writeFileSync(this.file, this.header + '\n');
  }

  private placeDetails(id: string): Promise<number> {
    return new Promise((rs) =>
      this.client
        .placeDetails({
          params: {
            key: this.key,
            place_id: id,
            fields: ['price_level'],
          },
        })
        .then((d) => rs(d['data']['result']['price_level']))
        .catch(APIError)
    );
  }

  private placeSearch(location: LocationType): Promise<number> {
    return new Promise((rs) =>
      this.client
        .placeAutocomplete({
          params: {
            key: this.key,
            input: `${location.name} ${location.city} ${location.state}`,
          },
        })
        .then((d: PlaceIdType) => {
          rs(this.placeDetails(d['data']['predictions'][0]['place_id']));
        })
        .catch(APIError)
    );
  }

  async writeRow(location: LocationType) {
    let price_level = await this.placeSearch(location);
    fs.appendFileSync(
      this.file,
      [...Object.values(location), price_level] + '\n'
    ); // TODO: wrap values in quotes probably
  }
}
