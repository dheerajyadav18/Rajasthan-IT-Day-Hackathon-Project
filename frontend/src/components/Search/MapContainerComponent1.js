import React from 'react';

import Map from 'devextreme-react/map';
import Button from 'devextreme-react/button';
import CheckBox from 'devextreme-react/check-box';

const markersData = [];



const markerUrl = 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/maps/map-marker.png';



class MapContainerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.originMarkersData = markersData;
    this.state = {
      markerUrl,
      markersData,
      centerCoordinates : { lat: 21.2514, lng: 81.6296 }
    };
    this.useCustomMarkers = this.useCustomMarkers.bind(this);
    this.showTooltips = this.showTooltips.bind(this);
  }

  useCustomMarkers(e) {
    this.setState({
      markerUrl: e.value ? markerUrl : null,
      markersData: this.originMarkersData,
    });
  }

  showTooltips() {
    this.setState({
      markersData: this.state.markersData.map((item) => {
        const newItem = JSON.parse(JSON.stringify(item));
        newItem.tooltip.isShown = true;
        return newItem;
      }),
    });
  }


  render() {
    return (
      <div style={{width:"100%", height:"100vh", overflow:"hidden", position:"relative"}}>
        <Map
          defaultZoom={11}
          height={"100%"}
          width="100%"
          controls={true}
          markerIconSrc={this.state.markerUrl}
          markers={this.state.markersData}
          defaultCenter={this.state.centerCoordinates}
          provider="bing">
        </Map>
        <div className="options" style={{position:"absolute", width: "100%",left:"0px", bottom:"0px", padding:"10px", background: "rgba(0, 0, 0, 0.6)", color:"white"}}>
          <div className="caption">Options</div>
          <div className="option">
            <CheckBox
            style={{cursor:"pointer"}}
              defaultValue={true}
              text="Use custom marker icons"
              onValueChanged={this.useCustomMarkers}
            />
          </div>
          <div className="option">
            <Button
              text="Show all tooltips"
              onClick={this.showTooltips}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default MapContainerComponent;
