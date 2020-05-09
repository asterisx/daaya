import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  slideshow: {
    width,
    height: 240,
  },
  infoSection: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    margin: 10,
  },
  image: {
    width,
    height: '100%',
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
