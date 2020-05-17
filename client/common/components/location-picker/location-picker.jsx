// @flow

import React, {useState, useEffect} from 'react';
import {TextInput, View, Dimensions, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import type {address} from '../../types';
import {commonStyles} from '../../styles';
import API from '../../api';
import {SafeAreaView} from 'react-navigation';
import {headerPadding} from '../header/styles';
import {Icon} from 'react-native-elements';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

type Props = {
  address?: address,
  onClose: ({address: address}) => void,
};

const LocationPicker = ({address, onClose}: Props) => {
  const [_address, set_address] = useState('');
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
    if (address && address.address) set_address(address.address);
  }, [address]);

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
    API.reverseGeoCode({
      location,
    })
      .then(address => {
        set_address(address);
      })
      .catch(() => {});
  }, [location.latitude, location.longitude]);

  useEffect(() => {
    const {latitude, longitude} = region;
    setLocation({latitude, longitude});
  }, [region.latitude, region.longitude]);

  return (
    <SafeAreaView>
      <View
        style={[
          commonStyles.widthFull,
          commonStyles.heightFull,
          commonStyles.flexColumn,
        ]}>
        <View style={[commonStyles.flexRowAlignCenter, headerPadding]}>
          <Icon
            name="arrow-back"
            onPress={() => {
              onClose({
                address: _address,
                location,
              });
            }}
          />
          <Text>Pick a Location</Text>
        </View>
        <View
          style={[
            commonStyles.widthFull,
            commonStyles.heightFull,
            commonStyles.flexColumn,
          ]}>
          <TextInput
            style={{marginHorizontal: 15, marginBottom: 10}}
            value={_address}
            onChangeText={address => set_address(address)}
          />
          <MapView
            style={[commonStyles.widthFull, commonStyles.flex1]}
            region={region}
            onRegionChange={region => setRegion(region)}>
            <Marker
              coordinate={location}
              onDragEnd={({position}) => setLocation(position)}
            />
          </MapView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LocationPicker;
