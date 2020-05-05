// @flow

import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Bio, Info, Posts} from '../../common/components';
import type {bio, institutionInfo, post} from "../../common/types";

type Props = {
    bio: bio,
    info: institutionInfo,
    posts: Array<post>,
    onPostClicked: ({id: number}) => void
}

const sections = {
  posts: 'posts',
  info: 'info',
};

function InstitutionPage({bio, info, posts, onPostClicked}: Props) {
  const [selectedSection, setSelectedSection] = useState(sections.posts);

  return (
    <View>
      <Bio {...bio} />
      {selectedSection === sections.posts && (
        <Posts posts={posts} onPostClicked={onPostClicked} />
      )}
      {selectedSection === sections.info && <Info {...info} />}
      <View>
        <TouchableOpacity onPress={() => setSelectedSection(sections.posts)}>
          <Text>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedSection(sections.info)}>
          <Text>Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default InstitutionPage;
