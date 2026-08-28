import Flex from "./boxes/Flex";
import "leaflet/dist/leaflet.css";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
} from "react-leaflet";
import { Typography } from "@mui/material";
import L from "leaflet";
import { City, Station } from "../types";

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

function StationPopup(params: { station: Station }) {
	return (
		<Popup>
			<Flex columns="100%" gap="5px">
				<Typography variant="subtitle2" data-testid="eventTitle">
					{params.station.name}
				</Typography>
			</Flex>
		</Popup>
	);
}

function CityPopup(params: { city: City }) {
	return (
		<Popup>
			<Flex columns="100%" gap="5px">
				<Typography variant="subtitle2" data-testid="eventTitle">
					{params.city.name}
				</Typography>
			</Flex>
		</Popup>
	);
}

export interface CityStationMapProps {
	dim?: number;
	blockScrolling?: boolean;
	city?: City;
	stations?: Station[];
}

export default function CityStationMap(props: CityStationMapProps) {
	const width = innerWidth < 1000 ? "300px" : props.dim || "1500px";
	const height = innerWidth < 1000 ? "300px" : props.dim || "500px";

  const getCityPos = (city?: City) => {
    if (city == undefined) {
      return { lat: 45, lng: 9.01 };
    }
    return { lat: city.latitude, lng: city.longitude };
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
					zoom={9}
					scrollWheelZoom={!props.blockScrolling}
					style={{ height: height, width: width }}
				>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

					{(props.stations || []).map((station, index) => (
						<Marker
             icon={redIcon}
							key={index}
							position={[station.latitude, station.longitude]}
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
