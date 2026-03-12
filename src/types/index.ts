// src/types/index.ts
export interface Place {
  id: string;
  nom_usuel: string;
  adresse: string;
  lat: number;
  lon: number;
  image: string;
  description: string;
  dateText?: string;
}

export type DiscoverStackParamList = {
  Discover: undefined;
  PlaceDetail: { place: Place };
};

export type TabParamList = {
  Découverte: undefined;
  Carte: undefined;
  Profil: undefined;
};
