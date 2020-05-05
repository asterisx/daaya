// @flow

import React from 'react';
import {Linking, TouchableOpacity, Text} from 'react-native';
import {email} from '../../types';

const Email = ({name, email}: email) => (
  <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
    <Text>{email}</Text>
  </TouchableOpacity>
);

export default Email;
