import React, { useEffect, useState } from 'react';


import Map from 'devextreme-react/map';
import Button from 'devextreme-react/button';
import CheckBox from 'devextreme-react/check-box';

// const markersData = ;

const customMarkerUrl = 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/maps/map-marker.png';


const MapContainerComponent = ({ markersDataprops }) => {
  console.log(markersDataprops)
  
  const [markerUrl, setMarkerUrl] = useState(customMarkerUrl)
  const [markersData, setMarkersData] = useState([]);
  const [centerCoordinates, setCenterCoordinates] = useState({ lat: 20.5937, lng: 78.9629 });

  useEffect(() => {
    setMarkersData(markersDataprops)
  }, [markersDataprops])

  const useCustomMarkers = (e) => {
    console.log(e)
    setMarkerUrl(e.target.checked ? customMarkerUrl : null);
    setMarkersData(markersDataprops);
  }

  const showTooltips = () => {
    setMarkersData((prv) => {
      return markersData.map((item) => {
        const newItem = JSON.parse(JSON.stringify(item));
        newItem.tooltip.isShown = true;
        return newItem
      })
    })
  }

  useEffect(() => {
    console.log("console ",markersData);
  }, [markersData]);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative" }}>
      <Map
        defaultZoom={6}
        height={"100%"}
        width="100%"
        controls={true}
        markerIconSrc={markerUrl}
        markers={markersData}
        defaultCenter={centerCoordinates}
        provider="bing">
      </Map>
      <div className="options w-full flex flex-col items-center content-center" style={{ position: "absolute", width: "100%", left: "0px", bottom: "0px", padding: "10px", background: "rgba(0, 0, 0, 0.6)", color: "white" }}>
        <div className='flex flex-col justify-center items-center'>
          <div className="caption"><h2 className='text-xl font-medium mb-1'>Options</h2></div>
          <div className="option cursor-pointer">
            <input className='mr-1' type="checkbox" onChange={useCustomMarkers} />
            <label>Use Custom marker icons</label>
            {/* <CheckBox
            style={{cursor:"pointer"}}
              defaultValue={true}
              text="Use custom marker icons"
              onValueChanged={useCustomMarkers}
            /> */}
          </div>
          <div className="option mt-1">
            <Button
              className='bg-gray-600 p-1 pl-4 pr-4 rounded-md'
              text="Show all tooltips"
              onClick={showTooltips}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapContainerComponent