import {StyleSheet, Dimensions} from 'react-native';
import {colors} from "../../common/styles";
const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    flexDirection: 'column'
  },
  slideshow: {
    width,
    height: 240,
  },
  infoSection: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    margin: 15,
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
  options: {
    width: '100%',
    flexDirection: 'row',
    height: 50
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    padding: 2,
  },
  category: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: colors.warning
  },
  categoryText: {
    fontSize: 12,
    color: 'white'
  }
});
