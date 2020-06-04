import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#2196f3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.36,
    shadowRadius: 7,
    elevation: 11,
  },
});
