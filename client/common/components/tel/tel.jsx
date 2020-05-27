// @flow

import React from 'react';
import {TouchableOpacity, Linking} from 'react-native';
import {Icon} from 'react-native-elements';
import {styles} from './styles';
import type {telephoneType} from '../../types';

const Tel = ({name, telephone}: telephoneType) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => Linking.openURL(`tel:${telephone}`)}>
    <Icon name="phone" color="#fff" />
  </TouchableOpacity>
);

export default Tel;
