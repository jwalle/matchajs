import * as React from 'react';
import * as Leaflet from 'leaflet';
import { Map, TileLayer, Marker, Popup, LatLng, MapProps } from 'react-leaflet';

type State = {
    position: LatLng,
    zoom: number,
    hasLocation: boolean;
};

export default class MatchaMap extends React.Component<{}, State> {
    // mapRef: MapProps | undefined = undefined;
    state = {
        position: {
            lat: 48.853088,
            lng: 2.349890
        },
        hasLocation: false,
        zoom: 13,
    };

    mapRef = React.createRef<Map>();

    // componentWillMount() {

    // }

    handleClick = () => {
        const map = this.mapRef.current;
        if (map != null) {
            map.leafletElement.locate();
        }
    }

    handleLocationFound = (e: any) => {
        console.log(e.latlng);
        this.setState({
            hasLocation: true,
            position: e.latlng,
        });
    }

    render() {
        const { position, zoom } = this.state;
        return (
            <Map
                center={position}
                zoom={zoom}
                ref={this.mapRef}
                onclick={this.handleClick}
                onlocationfound={this.handleLocationFound}>
                <TileLayer
                    attribution={`&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </Map>
        );
    }
}