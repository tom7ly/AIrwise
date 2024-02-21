import { MongoClient } from 'mongodb';
import axios from 'axios';
import Papa from 'papaparse';
interface AirportData {
    id: number;
    ident: string;
    type: string;
    name: string;
    latitude_deg: number;
    longitude_deg: number;
    elevation_ft: number;
    continent: string;
    iso_country: string;
    iso_region: string;
    municipality: string;
    scheduled_service: string;
    gps_code: string;
    iata_code: string | null;
    local_code: string;
    home_link: string | null;
    wikipedia_link: string | null;
    keywords: string | null;
}
export const loadCsv = async () => {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();

    const db = client.db('airwise');
    const collection = db.collection('airports');

    const response = (await axios.get('http://localhost:3000/download/airports.csv'))
    let unparsed_data = response.data
    let parsed_data: AirportData[] = [];

    Papa.parse<AirportData>(unparsed_data, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            parsed_data = results.data.filter(row =>
                row.iso_country &&
                row.iso_country.trim() !== '' &&
                (row.type === 'medium_airport' || row.type === 'large_airport' || row.type === 'small_airport')).map(row => {
                    delete row.id;
                    return row;
                });
        }
    })
    const length = parsed_data.length;
    for (let i = 0; i < parsed_data.length; i++) {
        await collection.insertOne(parsed_data[i]);
        process.stdout.write(`\rprogress percentage: ${(i / length * 100).toFixed(2)}%`);
    }
    console.log(parsed_data.length)
}
