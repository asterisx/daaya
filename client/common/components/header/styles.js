import {StyleSheet} from 'react-native';

export const headerPadding = {
  paddingHorizontal: 10,
  paddingVertical: 10
};

const commonHeaderStyle = {
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'white',
  ...headerPadding
}

export const styles = StyleSheet.create({
  homeHeaderContainer: {
    ...commonHeaderStyle,
    justifyContent: 'space-between',
  },
  headerContainer: {
    ...commonHeaderStyle
  },
  headerTitle: {},
  headerLogo: {
    marginLeft: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1
  },
});
