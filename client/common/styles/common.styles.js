import {StyleSheet} from 'react-native';

const flexRow = {
  flexDirection: 'row',
};

const flexColumn = {
  flexDirection: 'column',
};

export const commonStyles = StyleSheet.create({
  fullScreenContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginTop10: {
    marginTop: 10,
  },
  marginTop15: {
    marginTop: 15,
  },
  marginBottom15: {
    marginBottom: 15,
  },
  marginTop20: {
    marginTop: 20,
  },
  marginTop40: {
    marginTop: 40,
  },
  marginTop60: {
    marginTop: 60,
  },
  marginTop50: {
    marginTop: 50,
  },
  marginLeft20: {
    marginLeft: 20,
  },
  marginLeft10: {
    marginLeft: 10,
  },
  fontLarge: {
    fontSize: 20,
  },
  fontBlue: {
    color: '#48BBEC',
  },
  fontWhite: {
    color: '#fff',
  },
  heightFull: {
    height: '100%',
  },
  widthFull: {
    width: '100%',
  },
  flex1: {
    flex: 1,
  },
  flexRow: flexRow,
  flexWrap: {
    flexWrap: 'wrap',
  },
  flexColumn: flexColumn,
  flexRowAlignCenter: {
    ...flexRow,
    alignItems: 'center',
  },
  flexRowAlignStart: {
    ...flexRow,
    alignItems: 'flex-start',
  },
  flexRowJustifyAlignCenter: {
    ...flexRow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexColumnJustifyAlignCenter: {
    ...flexColumn,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  positionRelative: {
    position: 'relative',
  },
  positionAbsolute: {
    position: 'absolute',
  },
});

export const colors = {
  primary: '#1565c0',
  success: '#8bc34a',
};
