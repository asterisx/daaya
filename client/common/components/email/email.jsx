// @flow

import React from 'react';
import {Linking, TouchableOpacity, Text} from 'react-native';
import {emailType} from '../../types';

const Email = ({name, email}: emailType) => (
  <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
    <Text>{email}</Text>
  </TouchableOpacity>
);

export default Email;
