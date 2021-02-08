import { Client } from "@googlemaps/google-maps-services-js";
import { ThrowError, PriceDetail, PlaceId } from './typings/Requests.d';

export default class MapRequest {
    key: string;
    client: any;

    constructor(api_key: string) {
        this.key = api_key;
        this.client = new Client({});
    }

    throwError(err: ThrowError) {
        console.error(err.response.data.error_message)
    }

    placeDetails(id: string) {
        return new Promise(rs => this.client.placeDetails({
            params: {
                key: this.key,
                place_id: id,
                fields: "price_level"

            }
        })
            .then((d: PriceDetail) => rs(d["data"]["result"]["price_level"]))
            .catch(this.throwError)
        );
    }

    placeSearch(location: string) {
        return new Promise(rs => this.client.findPlaceFromText({
            params: {
                key: this.key,
                input: location,
                inputtype: "textquery"

            }
        })
            .then(async (d: PlaceId) => {
                let result = await this.placeDetails(d["data"]["candidates"][0]["place_id"]);
                rs(result)
            })
            .catch(this.throwError)
        );
    }
};