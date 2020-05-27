// @flow

import React, {useState, useEffect} from 'react';
import {TextInput, View, Text} from 'react-native';
import MapView from '../../../map-view';
import type {addressType} from '../../../../types';
import {commonStyles} from '../../../../styles';
import API from '../../../../api';
import {SafeAreaView} from 'react-navigation';
import {headerPadding} from '../../../header/styles';
import {Icon} from 'react-native-elements';

type Props = {
  address?: addressType,
  onClose: ({address: addressType}) => void,
};

const LocationPicker = ({address, onClose}: Props) => {
  const [_address, set_address] = useState('');
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (address && address.address) set_address(address.address);
  }, [address]);

  useEffect(() => {
    API.reverseGeoCode({
      location,
    })
      .then(address => {
        set_address(address);
      })
      .catch(() => {});
  }, [location.lat, location.lng]);

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
            style={{
              marginHorizontal: 15,
              marginBottom: 10,
              borderBottomColor: '#000',
              borderBottomWidth: 2,
              paddingHorizontal: 2,
              paddingBottom: 2,
            }}
            value={_address}
            onChangeText={address => set_address(address)}
          />
          <MapView onLocationChange={({location}) => setLocation(location)} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LocationPicker;
