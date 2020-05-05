// @flow

import React from 'react';
import {Linking, Text, TouchableOpacity} from 'react-native';
import type {telephone} from '../../types';

const Tel = ({name, number}: telephone) => (
  <TouchableOpacity onPress={() => Linking.openURL(`tel:${number}`)}>
    <Text>{number}</Text>
  </TouchableOpacity>
);

export default Tel;
