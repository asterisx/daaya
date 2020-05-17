// @flow

import React from 'react';
import {Alert, View} from 'react-native';
import Image from 'react-native-scalable-image';
import {Icon} from 'react-native-elements';

import {styles} from './styles';
import {commonStyles} from '../../../../styles';

type Props = {
  uri: string,
  onDelete: () => {},
};

const confirmDeletion = onDelete =>
  Alert.alert(
    'Delete the image?',
    undefined,
    [
      {
        text: 'No',
      },
      {text: 'Yes', onPress: onDelete},
    ],
    {cancelable: true},
  );

const ListingImage = ({uri, onDelete}: Props) => (
  <View style={styles.container}>
    <Image
      source={{uri}}
      resizeMode="contain"
      style={styles.image}
      width={styles.image.width}
    />

    <Icon
      name="cancel"
      color="red"
      onPress={() => confirmDeletion(onDelete)}
    />
  </View>
);

export default ListingImage;
