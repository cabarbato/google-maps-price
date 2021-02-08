import { Client } from "@googlemaps/google-maps-services-js";
import { apiError } from "./Error";
import { PriceDetail, PlaceId } from './typings/Requests.d';
import { Location } from './typings/Location.d';

export default class MapRequest {
    key: string;
    client: any; //TODO: find out Client type

    constructor(api_key: string) {
        this.key = api_key
        this.client = new Client({})
    }

    placeDetails(id: string) {
        return new Promise(rs => this.client.placeDetails({
            params: {
                key: this.key,
                place_id: id,
                fields: ["price_level"]

            }
        })
            .then((d: PriceDetail) => rs(d["data"]["result"]["price_level"]))
            .catch(apiError)
        );
    }

    placeSearch(location: Location) {
        return this.client.placeAutocomplete({
            params: {
                key: this.key,
                input: `${location.name} ${location.city} ${location.state}`

            }
        })
            .then(async (d: PlaceId) => {
                location.price_level = await this.placeDetails(d["data"]["predictions"][0]["place_id"]);
                // CsvParser.writeRows(location)
                // TODO: either move this out or import CsvParser here as well.
                // Maybe only import CsvParser in here or switch to separate functions.
                // Probably also add row anyway if no matches are found.
            })
            .catch(apiError)
            .finally(d => d);
    }
};