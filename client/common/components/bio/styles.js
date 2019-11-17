import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      position: 'relative'
    },
    bannerImage: {
        width: Dimensions.get('window').width,
    },
    avatar: {
        position: 'absolute',
        left: '10',
        bottom: '-50',
        height: '100',
        width: '100'
    },
    title: {
        marginLeft: '110'
    },
});
