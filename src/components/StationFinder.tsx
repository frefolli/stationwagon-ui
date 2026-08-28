import axios from "axios";
import Multiselect from "./Multiselect";
import CityStationMap from "./CityStationMap";
import { useState } from "react";
import { City, Station } from "../types";

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
  const [stations, setStations] = useState([] as Station[]);
  const [city, setCity] = useState(undefined as City|undefined);

  const fetchSelected = (ID: string|undefined) => {
    if (ID !== undefined && ID !== "") {
      axios.get(`${props.ajax_item_list}/${ID}`)
      .then(response => {
        let city = response.data as City;
        setCity(city);
        fetchStations(city);
      }).catch(err => {
        console.log(err);
      });
    }
  }

  const fetchStations = (data: City) => {
    let queryObject: Coordinates = {
      latitude: data.latitude,
      longitude: data.longitude,
    };
    axios.post(props.ajax_item_find, queryObject)
    .then(response => {
      setStations(response.data);
    }).catch(err => {
      console.log(err);
    });
  }

  return <div>
    <Multiselect
      label={props.label}
      value={city?.id}
      onChange={fetchSelected}
      ajax={props.ajax_item_list}/>
    <CityStationMap city={city} stations={stations}/>
  </div>;
}

export default StationFinder;
