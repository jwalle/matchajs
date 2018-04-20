import * as React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

export interface GoogleMapProps {
    center: {
        lat: number,
        lng: number
    };
    zoom: number;
}

export default class GoogleMap extends React.Component<GoogleMapProps, {}> {

  render() {
    return (
        <div id="googleMapContainer">
            <GoogleMapReact
                center={this.props.center}
                defaultZoom={this.props.zoom}
                bootstrapURLKeys={{ key: 'AIzaSyCkdJC3FA49muGZoDrrMhaFtx26yAlkYIg' }}
            >
                <AnyReactComponent
                    lat={40.7473310}
                    lng={-73.8517440}
                    text={`Where's Waldo?`}
                />
            </ GoogleMapReact>
        </div>
    );
  }
}
