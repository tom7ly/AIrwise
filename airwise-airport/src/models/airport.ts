import mongoose, { Document, Schema } from 'mongoose';

// Define the interface
interface IAirport extends Document {
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
  iata_code?: string;
  local_code: string;
  home_link?: string;
  wikipedia_link?: string;
  keywords?: string;
}

// Define the schema
const AirportSchema: Schema = new Schema({
  ident: { type: String, required: false },
  type: { type: String, required: false },
  name: { type: String, required: false },
  latitude_deg: { type: Number, required: false },
  longitude_deg: { type: Number, required: false },
  elevation_ft: { type: Number, required: false },
  continent: { type: String, required: false },
  iso_country: { type: String, required: false },
  iso_region: { type: String, required: false },
  municipality: { type: String, required: false },
  scheduled_service: { type: String, required: false },
  gps_code: { type: String, required: false },
  iata_code: { type: String },
  local_code: { type: String, required: false },
  home_link: { type: String },
  wikipedia_link: { type: String },
  keywords: { type: String },
});

// Create the model
const AirportModel = mongoose.models.Airport || mongoose.model<IAirport>('Airport', AirportSchema);
export { IAirport, AirportModel };