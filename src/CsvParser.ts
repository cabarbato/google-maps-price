
import Papa from 'papaparse';
import fs from 'fs';
import { Location } from './typings/Location.d';

export default class CsvParser {
    file: string;

    constructor(file: string) {
        this.file = file;
        const header: string[] = ["city_location", "search term", "id",
            "alias", "name", "rating", "review_count", "price", "phone",
            "categories", "latitude", "longitude", "display_address",
            "city", "state", "zip_code", "url", "price_level"]

        fs.writeFileSync(`./data/output/${this.file}`,
            header + "\n"
        );
    }

    getRows() {
        return Papa.parse(
            fs.readFileSync(`./data/input/${this.file}`, 'utf8'),
            {
                header: true
            })
    }

    writeRows(location: Location) {
        let row: string[] = Object.values(location);
        console.log(row)
        fs.appendFileSync(`./data/output/${this.file}`,
            row + "\n"
        );
    }
}