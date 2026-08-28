import Flex from "./boxes/Flex";
import "leaflet/dist/leaflet.css";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
  useMap
} from "react-leaflet";
import { Typography } from "@mui/material";
import L from "leaflet";
import { City, StationEx } from "../types";

const redIcon = new L.Icon({
	iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
	shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
	iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
	shadowSize: [41, 41],
});

function StationPopup(params: { station: StationEx }) {
	return (
		<Popup>
			<Flex columns="100%" gap="5px">
				<Typography variant="subtitle2" data-testid="stationLabel">
					{params.station.station.label}
				</Typography>
				<Typography variant="subtitle2" data-testid="stationDistance">
					{`${params.station.distance} km`}
				</Typography>
			</Flex>
		</Popup>
	);
}

function CityPopup(params: { city: City }) {
  const leMap = useMap();
  leMap.setView({lat: params.city.latitude, lng: params.city.longitude}, 11);
	return (
		<Popup>
			<Flex columns="100%" gap="5px">
				<Typography variant="subtitle2" data-testid="cityLabel">
					{params.city.label}
				</Typography>
			</Flex>
		</Popup>
	);
}

export interface CityStationMapProps {
	blockScrolling?: boolean;
	city?: City;
  zoom?: number;
	stations?: StationEx[];
}

export default function CityStationMap(props: CityStationMapProps) {
	const width = innerWidth < 1000 ? "300px" : "1500px";
	const height = innerWidth < 1000 ? "300px" : "750px";

  const getZoom = (zoom?: number): number => {
    if (zoom === undefined)
      return 9;
    return zoom;
  }

  const getCityPos = (city?: City) => {
    if (city == undefined) {
      return { lat: 45, lng: 9.01 };
    }
    let result = { lat: city.latitude, lng: city.longitude };
    console.log(result);
    return result;
  };

	return (
		<Flex columns="100%" center>
			<label
				onClick={(x) => {
					x.stopPropagation();
					x.preventDefault();
				}}
				data-testid="mappa"
			>
				<MapContainer
					preferCanvas={true}
					center={getCityPos(props.city)}
					zoom={getZoom(props.zoom)}
					scrollWheelZoom={!props.blockScrolling}
					style={{ height: height, width: width }}
				>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

					{(props.stations || []).map((station, index) => (
						<Marker
             icon={redIcon}
							key={index}
							position={[station.station.latitude, station.station.longitude]}
							eventHandlers={{
								click: (x) => {
									x.originalEvent.stopPropagation();
									x.originalEvent.preventDefault();
								},
							}}
						>
							<StationPopup station={station} />
						</Marker>
					))}

          {props.city ? 
						(<Marker
             icon={blueIcon}
							key={-1}
							position={[props.city.latitude, props.city.longitude]}
							eventHandlers={{
								click: (x) => {
									x.originalEvent.stopPropagation();
									x.originalEvent.preventDefault();
								},
							}}
						>
							<CityPopup city={props.city} />
						</Marker>) : <div/>}
				</MapContainer>
			</label>
		</Flex>
	);
}
