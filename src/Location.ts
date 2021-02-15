import fs from 'fs';
import 'dotenv/config';
import { Client } from '@googlemaps/google-maps-services-js';
import { APIError } from './Error';
import { LocationType } from './typings/Location';
import { PriceDetailType, PlaceIdType } from './typings/Requests';

export default class LocationSearch {
  key: string;
  file: string;
  header: string[];
  client: any; //TODO: get actual client type

  constructor(header: string[]) {
    this.header = [...header, 'price_level'];
    this.key = process.env.API_KEY! as string;
    this.file = process.env.OUTPUT_FILE! as string;
    this.client = new Client({});

    fs.writeFileSync(this.file, this.header + '\n');
  }

  placeDetails(id: string): Promise<string> {
    return new Promise(rs =>
      this.client
        .placeDetails({
          params: {
            key: this.key,
            place_id: id,
            fields: ['price_level'],
          },
        })
        .then((d: PriceDetailType) => rs(d['data']['result']['price_level']))
        .catch(APIError)
    );
  }

  placeSearch(location: LocationType): Promise<string> {
    return new Promise(rs =>
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
      console.log(price_level)
    return fs.appendFileSync(this.file, [...Object.values(location), price_level] + '\n'); // TODO: wrap values in quotes probably
  }
}
