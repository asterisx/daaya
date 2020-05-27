// @flow

import React from "react";
import {FlatList} from 'react-native';
import Post from '../post';
import type {postType} from "../../types";

type Props = {
  posts: Array<postType>,
  onPostClicked: ({id: string}) => void
};

const Posts = ({posts, onPostClicked}: Props) => (
  <FlatList
    data={posts}
    renderItem={({item}) => <Post {...item} onPostClicked={() => onPostClicked({id: item.id})} />}
  />
);

export default Posts;
