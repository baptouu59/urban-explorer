import axios from "axios"
import { ApiResponse, Place } from "../types"


export const MOCK_PLACES: Place[] = [
  {
    id: '1',
    title: 'Louvre et Tuileries',
    address_name: 'Rue de Rivoli, 75001 Paris',
    lat_lon: { lat: 48.8606, lon: 2.3376 }
  },
  {
    id: '2',
    title: 'Tour Eiffel',
    address_name: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris',
    lat_lon: { lat: 48.8584, lon: 2.2945 }
  },
  {
    id: '3',
    title: 'Sacré-Cœur de Montmartre',
    address_name: '35 Rue du Chevalier de la Barre, 75018 Paris',
    lat_lon: { lat: 48.8867, lon: 2.3431 }
  },
  {
    id: '4',
    title: 'Cathédrale Notre-Dame',
    address_name: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris',
    lat_lon: { lat: 48.8530, lon: 2.3499 }
  },
  {
    id: '5',
    title: 'Arc de Triomphe',
    address_name: 'Pl. Charles de Gaulle, 75008 Paris',
    lat_lon: { lat: 48.8738, lon: 2.2950 }
  },
  {
    id: '6',
    title: 'Centre Pompidou',
    address_name: 'Place Georges-Pompidou, 75004 Paris',
    lat_lon: { lat: 48.8606, lon: 2.3522 }
  },
  {
    id: '7',
    title: 'Jardin du Luxembourg',
    address_name: '75006 Paris',
    lat_lon: { lat: 48.8462, lon: 2.3371 }
  },
  {
    id: '8',
    title: 'Opéra Garnier',
    address_name: 'Pl. de l\'Opéra, 75009 Paris',
    lat_lon: { lat: 48.8720, lon: 2.3316 }
  },
  {
    id: '9',
    title: 'Panthéon',
    address_name: 'Pl. du Panthéon, 75005 Paris',
    lat_lon: { lat: 48.8462, lon: 2.3449 }
  },
  {
    id: '10',
    title: 'Musée d\'Orsay',
    address_name: '1 Rue de la Légion d\'Honneur, 75007 Paris',
    lat_lon: { lat: 48.8599, lon: 2.3265 }
  }
];

const api = axios.create({
  baseURL:
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets",
  timeout: 10000
})

export const fetchPlaces = async (): Promise<Place[]> => {
  try {
    const response = await api.get<ApiResponse>(
      "/que-faire-a-paris-/records?limit=20"
    );

    return response.data.results.map((item: any) => ({
      id: item.id || item.recordid || Math.random().toString(),
      title: item.title,
      address_name: item.address_name,
      image_url: item.cover_url,
      lat_lon: item.lat_lon
    }));

  } catch (error) {
    console.warn("Échec de l'API Paris Open Data, utilisation du fallback :", error);
    return MOCK_PLACES;
  }
};



