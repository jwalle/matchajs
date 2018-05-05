import * as React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

export const GOOGLE_MAP_API = 'AIzaSyBah4ewvWs7mNaM9QaEuc_JwnvrnCCsZ5M';

export interface GoogleMapProps {
    center: {
        lat: number,
        lng: number
    };
    zoom: number;
}

export default class GoogleMap extends React.Component<GoogleMapProps, {}> {

  render() {
    const center = this.props.center;
    console.log('KEY: ', process.env.GOOGLE_MAP_API);
    return (
        <div id="googleMapContainer">
            <GoogleMapReact
                center={center}
                defaultZoom={this.props.zoom}
                bootstrapURLKeys={{ key: GOOGLE_MAP_API }}
            >
                <AnyReactComponent
                    lat={center.lat}
                    lng={center.lng}
                    text={`Where's Waldo?`}
                />
            </ GoogleMapReact>
        </div>
    );
  }
}
