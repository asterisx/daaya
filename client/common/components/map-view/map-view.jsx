// @flow

import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import RNMapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import {commonStyles} from '../../styles';
import type {locationType} from '../../types';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type Props = {
  onLocationChange: ({location: locationType}) => void,
  children?: *,
};

const MapView = ({onLocationChange, children}: Props) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
        setRegion({...region, ...position.coords});
      },
      error => {},
      {enableHighAccuracy: false, timeout: 500, maximumAge: 500},
    );
    Geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
        setRegion({...region, ...position.coords});
      },
      error => {},
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  useEffect(() => {
    const {latitude, longitude} = region;
    setLocation({latitude, longitude});
  }, [region.latitude, region.longitude]);

  useEffect(() => {
    const {latitude, longitude} = location;
    onLocationChange({
      location: {
        lng: longitude,
        lat: latitude,
      },
    });
  }, [location.latitude, location.latitude]);

  return (
    <RNMapView
      style={[commonStyles.widthFull, commonStyles.flex1]}
      region={region}
      onRegionChange={region => setRegion(region)}>
      <Marker
        coordinate={location}
        onDragEnd={({longitude, latitude}) =>
          setLocation({longitude, latitude})
        }
      />
      {children}
    </RNMapView>
  );
};

export default MapView;
