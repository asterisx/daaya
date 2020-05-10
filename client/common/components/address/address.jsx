// @flow

import React from 'react';
import {Platform, Linking, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {styles} from './styles';
import type {address} from '../../types';

const Address = ({address, location}: address) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() =>
      location &&
      Linking.openURL(
        `${Platform.OS === 'ios' ? 'maps:' : 'geo:'}${location.lat},${
          location.lng
        }`,
      )
    }>
    <Icon name="room" />
    <Text>{address}</Text>
  </TouchableOpacity>
);

export default Address;
