// @flow

import React from 'react';
import {Platform, Linking, Text, TouchableOpacity, View} from 'react-native';
import type {address} from '../../types';

const Address = ({address, location}: address) => (
  <View>
    <Text>{address}</Text>
    {location && (
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            `${Platform.OS === 'ios' ? 'maps:' : 'geo:'}${
              address.location.lat
            },${address.location.lng}`,
          )
        }>
        <Text>Open Map</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default Address;
