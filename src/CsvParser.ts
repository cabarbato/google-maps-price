import Papa from 'papaparse';
import fs from 'fs';
import { Location } from './typings/Location.d';

export default class CsvParser {
    file: string;

    constructor(file) {
        this.file = file
    }

    getRows() {
        const header: string[] = ["city_location", "search term", "id",
            "alias", "name", "rating", "review_count", "price", "phone",
            "categories", "latitude", "longitude", "display_address",
            "city", "state", "zip_code", "url", "price_level"]

        fs.writeFileSync(`./data/output/${this.file}`,
            header + "\n"
        );

        return Papa.parse(
            fs.readFileSync(`./data/input/${this.file}`, 'utf8'),
            {
                header: true
            })
    }
    
    writeRows(location: Location) {
        if (location.price_level) console.log(location.price_level)
        let row: string[] = Object.values(location);
        return fs.appendFileSync(`./data/output/${this.file}`,
            row + "\n"
        );
    }
}