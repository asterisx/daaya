import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: (Dimensions.get('window').width - 60) / 3,
    margin: 2,
    padding: 4,
  },
  image: {
    width: (Dimensions.get('window').width - 64) / 3,
  },
  closeIcon: {},
});
