import { AirportTypeEnum } from 'src/generated/enums/AirportTypeEnum';

export interface IAirportInput {
    ident: string,
    airportType: AirportTypeEnum,
    name: string,
    latitude_deg: number,
    longitude_deg: number,
    elevation_ft: number,
    continent: string,
    iso_country: string,
    iso_region: string,
    municipality: string,
    scheduled_service: string,
    iata_code: string,
    local_code: string,
    home_link: string,
    wikipedia_link: string,
    keywords: string
}