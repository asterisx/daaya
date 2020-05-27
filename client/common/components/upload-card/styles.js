import {StyleSheet} from 'react-native';
import {colors} from '../../styles';

export const styles = StyleSheet.create({
  image: {
    height: 200,
  },
  title: {
    paddingTop: 10,
  },
  category: {
    paddingTop: 5,
    color: colors.warning,
  },
  status: {
    color: 'grey',
    fontStyle: 'italic',
  },
  button: {
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
