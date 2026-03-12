import axios from 'axios';
import { Place } from '../types';

const API_URL =
  'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=40';

const FALLBACK_PLACES: Place[] = [
  {
    id: '1',
    nom_usuel: 'Exposition au Louvre',
    adresse: 'Rue de Rivoli, 75001 Paris',
    lat: 48.8606,
    lon: 2.3376,
    image: 'https://picsum.photos/400/300?random=1',
    description: 'Une sortie culturelle incontournable au cœur de Paris.',
    dateText: 'Aujourd’hui',
  },
  {
    id: '2',
    nom_usuel: 'Concert au Centre Pompidou',
    adresse: 'Place Georges-Pompidou, 75004 Paris',
    lat: 48.8606,
    lon: 2.3522,
    image: 'https://picsum.photos/400/300?random=2',
    description: 'Un événement artistique moderne et vivant.',
    dateText: 'Cette semaine',
  },
  {
    id: '3',
    nom_usuel: "Visite au musée d'Orsay",
    adresse: "1 Rue de la Légion d'Honneur, 75007 Paris",
    lat: 48.86,
    lon: 2.3266,
    image: 'https://picsum.photos/400/300?random=3',
    description: 'Un moment culturel à ne pas manquer.',
    dateText: 'Prochainement',
  },
];

function toNumber(value: unknown): number | null {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function mapEventToPlace(item: any, index: number): Place | null {
  const lat =
    toNumber(item?.lat_lon?.lat) ??
    toNumber(item?.coordonnees_geo?.lat) ??
    toNumber(item?.geo_point_2d?.lat);

  const lon =
    toNumber(item?.lat_lon?.lon) ??
    toNumber(item?.coordonnees_geo?.lon) ??
    toNumber(item?.geo_point_2d?.lon);

  if (lat === null || lon === null) return null;

  return {
    id: String(item?.id ?? item?.uid ?? index),
    nom_usuel:
      item?.title?.trim() ||
      item?.nom_usuel?.trim() ||
      item?.name?.trim() ||
      `Événement ${index + 1}`,
    adresse:
      item?.address_name?.trim() ||
      item?.address_street?.trim() ||
      item?.adresse?.trim() ||
      'Paris',
    lat,
    lon,
    image: `https://picsum.photos/400/300?random=${index + 1}`,
    description:
      item?.lead_text?.trim() ||
      item?.description?.trim() ||
      'Un événement à découvrir dans Paris.',
    dateText:
      item?.date_description?.trim() ||
      item?.occurrences?.trim() ||
      item?.date_start?.trim() ||
      'À découvrir',
  };
}

export async function fetchPlaces(): Promise<Place[]> {
  try {
    const response = await axios.get(API_URL, { timeout: 10000 });
    const results = response.data?.results ?? [];

    const places = results
      .map((item: any, index: number) => mapEventToPlace(item, index))
      .filter(Boolean) as Place[];

    return places.length ? places : FALLBACK_PLACES;
  } catch (error) {
    console.log('Erreur API Paris:', error);
    return FALLBACK_PLACES;
  }
}