// @flow

import React from 'react';
import {Image, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {Address, Tel} from "../../common/components";
import type {address, category, telephone} from "../../common/types";
import {styles} from './styles';

type Props = {
    images: Array<string>,
    title: string,
    category: category,
    address?: address,
    telephone?: telephone,
}

const ListingDetail = ({
  images,
  title,
  category,
  address,
  telephone,
}: Props) => (
  <View>
    <Swiper style={styles.wrapper} height={240}>
      {images.map((image) => (
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={image}
        />
      )
      )}
    </Swiper>
    <Text>{title}</Text>
    <Text>{category}</Text>
    {address && <Address {...address} />}
    {telephone && <Tel {...telephone} /> }
  </View>
);

export default ListingDetail;
