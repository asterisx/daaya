// @flow

import React from 'react';
import {Linking, Text, TouchableOpacity} from 'react-native';
import type {telephone} from '../../types';

const Tel = ({name, telephone}: telephone) => (
  <TouchableOpacity onPress={() => Linking.openURL(`tel:${telephone}`)}>
    <Text>{telephone}</Text>
  </TouchableOpacity>
);

export default Tel;
