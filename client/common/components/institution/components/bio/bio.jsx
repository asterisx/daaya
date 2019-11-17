// @flow

import React from 'react';
import {View} from 'react-native';

type bio = {
  institutionName: string,
  bannerSrc: string,
};

const Bio = ({
  institutionName: string,
  bannerSrc: string,
  avatar: string,
}: bio) => <View></View>;

export default Bio;
