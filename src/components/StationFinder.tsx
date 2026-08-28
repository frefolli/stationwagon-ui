import CitySelector from "./CitySelector";
import CityStationMap from "./CityStationMap";
import { useState, useEffect } from "react";
import STATIONS from "../data/stations.json";
import { City, Station, StationEx } from "../types";

interface Coordinates {
  latitude: number,
  longitude: number
};

interface StationFinderProps {
  label: string,
  ajax_item_list: string,
  ajax_item_find: string,
};

const StationFinder = (props: StationFinderProps) => {
  const [stations, setStations] = useState([] as StationEx[]);
  const [city, setCity] = useState(undefined as City|undefined);

  const roundNumber = (input: number, precision: number): number => {
    const factor = Math.pow(10, precision);
    return Math.round(input * factor) / factor;
  };

  const computeDistance = (A: Coordinates, B: Coordinates): number => {
    const R = 6371e3;
    const a_latitude_in_radians = A.latitude * Math.PI/180;
    const b_latitude_in_radians = B.latitude * Math.PI/180;
    const delta_latitude_in_radians = (B.latitude-A.latitude) * Math.PI/180;
    const delta_longitude_in_radians = (B.longitude-A.longitude) * Math.PI/180;

    const a = Math.sin(delta_latitude_in_radians/2) * Math.sin(delta_latitude_in_radians/2) +
      Math.cos(a_latitude_in_radians) * Math.cos(b_latitude_in_radians) *
      Math.sin(delta_longitude_in_radians/2) * Math.sin(delta_longitude_in_radians/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = (R * c);
    return roundNumber(d / 1000, 3);
  }

  const decorateWithDistanceFromCity = (station: Station, city: City): StationEx => {
    return {
      station: station,
      distance: computeDistance(station, city)
    };
  }

  const sortStationEx = (a: StationEx, b: StationEx): number => {
    if (a.distance != b.distance)
      return a.distance < b.distance ? -1 : 1;
    if (a.station.id != b.station.id)
      return a.station.id < b.station.id ? -1 : 1;
    return 0;
  }

  useEffect(() => {
    if (city === undefined) {
      setStations([]);
    } else {
      let candidates = STATIONS.map((station: Station) => decorateWithDistanceFromCity(station, city));
      candidates.sort(sortStationEx);
      setStations(candidates.slice(0, 30));
    }
  }, [city])

  return <div>
    <CitySelector
      label={props.label}
      value={city}
      onChange={setCity}/>
    <CityStationMap city={city} stations={stations}/>
  </div>;
}

export default StationFinder;
