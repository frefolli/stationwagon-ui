export interface Station {
  id: number,
  label: string,
  latitude: number,
  longitude: number
};

export interface City {
  id: number,
  label: string,
  latitude: number,
  longitude: number
};

export interface StationEx {
  station: Station,
  distance: number
};
