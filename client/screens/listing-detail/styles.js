import {StyleSheet, Dimensions} from 'react-native';
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
  options: {
    width: '100%',
    flexDirection: 'row',
    height: 50
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  category: {
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: '#F2784B'
  },
  categoryText: {
    fontSize: 12,
    color: 'white'
  }
});
