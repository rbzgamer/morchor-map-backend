import { PlacePhoto } from '@googlemaps/google-maps-services-js';
import * as mongoose from 'mongoose';

export const LocationSchema = new mongoose.Schema({
  locationName: {
    type: [String],
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  latitude: {
    type: String,
    require: true,
  },
  longitude: {
    type: String,
    require: true,
  },
  room: {
    type: [String],
  },
});

export interface Location {
  id?: string;
  locationName: string[];
  category?: string;
  latitude: string;
  longitude: string;
  room?: string[];
}
