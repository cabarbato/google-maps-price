import { Client } from "@googlemaps/google-maps-services-js";

export default class RunSearch {
    constructor(api_key) {
        this.key = api_key;
        this.client = new Client({});
    }

    throwError(err){
        console.error(err.response.data.error_message)
    }

    placeDetails(id) {
        return new Promise (resolve => this.client.placeDetails({
            params: {
                key: this.key,
                place_id: id,
                fields: "price_level"

            }
        })
            .then((d) => resolve(d["data"]["result"]["price_level"]))
            .catch(this.throwError));
    }

     placeSearch(location) {
        return new Promise (resolve => this.client.findPlaceFromText({
            params: {
                key: this.key,
                input: location,
                inputtype: "textquery"

            }
        })
            .then(async (d) => {
                let result = await this.placeDetails(d["data"]["candidates"][0]["place_id"]);
                resolve(result)
            })
            .catch(this.throwError))
    }
};