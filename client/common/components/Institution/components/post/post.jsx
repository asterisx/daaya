import {
  Text,
  Image,
  View,
  TouchableNativeFeedback
} from "react-native";
import { Avatar } from 'react-native-elements';

import {styles} from './styles';

const Post = ({
  containerStyle,
  poster,
  image,
  createdDate,
  sentences,
  onPostClicked
}) => (
  <TouchableNativeFeedback onPress={onPostClicked}>
    <View style={[styles.container, containerStyle]}>
      <View style={styles.postRow}>
        <View style={styles.userImage}>
          <Avatar
            rounded
            size="medium"
            source={{
              uri: poster.avatar
            }}
          />
        </View>
        <View>
          <Text>{poster.name}</Text>
          <Text style={styles.date}>
            {createdDate}
          </Text>
        </View>
      </View>
      {image && <Image style={styles.postImage} source={{ uri: image }} />}
      <View style={styles.wordRow}>
        <Text style={styles.wordText}>{sentences}</Text>
      </View>
    </View>
  </TouchableNativeFeedback>
);

Post.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  image: PropTypes.string,
  poster: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  createdDate: PropTypes.string.isRequired,
  sentences: PropTypes.string.isRequired
};

Post.defaultProps = {
  containerStyle: {},
  image: null
};

export default Post;
