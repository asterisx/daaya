// @flow

import React from 'react';
import {Text, Image, View, TouchableNativeFeedback} from 'react-native';
import {Avatar} from 'react-native-elements';
import {styles} from './styles';
import {post} from '../../types';

const Post = ({poster, image, createdDate, post, onPostClicked}: post) => (
  <TouchableNativeFeedback onPress={onPostClicked}>
    <View style={[styles.container]}>
      <View style={styles.postRow}>
        <View style={styles.userImage}>
          <Avatar
            rounded
            size="medium"
            source={{
              uri: poster.avatar,
            }}
          />
        </View>
        <View>
          <Text>{poster.name}</Text>
          <Text style={styles.date}>{createdDate}</Text>
        </View>
      </View>
      {image && <Image style={styles.postImage} source={{uri: image}} />}
      <View style={styles.wordRow}>
        <Text style={styles.wordText}>{post}</Text>
      </View>
    </View>
  </TouchableNativeFeedback>
);

export default Post;
