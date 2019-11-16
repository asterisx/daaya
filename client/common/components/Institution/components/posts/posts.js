import {FlatList} from 'react-native';
import Post from '../post';

const Posts = ({posts, onPostClicked}) => (
  <FlatList
    data={posts}
    renderItem={({item}) => <Post {...item} onPostClicked={onPostClicked} />}
  />
);

export default Posts;
