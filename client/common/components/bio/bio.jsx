// @flow

import React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './styles';
import type {bioType} from "../../types";

const Bio = ({institutionName, bannerSrc, avatar}: bioType) => (
  <View style={styles.container}>
    <Image source={bannerSrc} style={styles.bannerImage} />
    <Image source={avatar} style={styles.avatar} />
    <Text style={styles.title}>{institutionName}</Text>
  </View>
);

export default Bio;
