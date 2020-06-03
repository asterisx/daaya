// @flow

import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {commonStyles} from '../../styles';

type Props = {};

const ScreenLoader = () => (
  <View style={commonStyles.fullScreenContainer}>
    <ActivityIndicator />
    <Text style={commonStyles.marginTop10}>Loading...</Text>
  </View>
);

export default ScreenLoader;