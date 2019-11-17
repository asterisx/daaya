// @flow

import React, {useEffect, useReducer} from 'react';
import {
  Button,
  Image,
  Picker,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {connect} from 'react-redux';
import {uploadListing} from '../thunks';
import {styles} from './styles';
import type {category} from '../../types';

type props = {
  uploadStatus: string,
  categories: Array<category>,
  uploadListing: ({
    title: string,
    category: number,
    images: Array<string>,
    showAddress: boolean,
    showContact: boolean,
  }) => void,
};

const actions = {
  SET_TITLE: 'SET_TITLE',
  SET_CATEGORY: 'SET_CATEGORY',
  ADD_IMAGE: 'ADD_IMAGE',
  SET_IMAGES: 'SET_IMAGES',
  SET_SHOW_ADDRESS: 'SET_SHOW_ADDRESS',
  SET_SHOW_CONTACT: 'SET_SHOW_CONTACT',
};

const initialState = {
  title: '',
  category: 0,
  images: [],
  showAddress: false,
  showContact: true,
};

const reducer = (state, action) => {
  const {type, value} = action;
  switch (type) {
    case actions.SET_TITLE:
      return {...state, title: value};
    case actions.SET_CATEGORY:
      return {...state, category: value};
    case actions.ADD_IMAGE:
      return {...state, images: state.images.concat(value)};
    case actions.SET_IMAGES:
      return {...state, images: value};
    case actions.SET_SHOW_ADDRESS:
      return {...state, showAddress: value};
    case actions.SET_SHOW_CONTACT:
      return {...state, showContact: value};
    default:
      return state;
  }
};

function UploadForm({uploadStatus, uploadListing, categories}: props) {
  const [
    {title, images, category, showAddress, showContact},
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => dispatch({type: actions.SET_CATEGORY, value: categories[0].id}), []);

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <TextInput
        value={title}
        onChangeText={text => dispatch({type: actions.SET_TITLE, value: text})}
      />
      <Picker
        selectedValue={category}
        onValueChange={value => dispatch({type: actions.SET_CATEGORY, value})}>
        {categories.map(({id, value}: category) => (
          <Picker.Item label={value} value={id} />
        ))}
      </Picker>
      <View>
        <Text>Show Contact</Text>
        <Switch
          value={showContact}
          onValueChange={value => dispatch({type: actions.SET_SHOW_CONTACT, value})}
        />
      </View>
      <View>
        <Text>Show Address</Text>
        <Switch
          value={showAddress}
          onValueChange={value => dispatch({type: actions.SET_SHOW_ADDRESS, value})}
        />
      </View>
      <DraggableFlatList
        data={images}
        renderItem={({item}) => <Image source={item} />}
        keyExtractor={item => `${item.key}`}
        scrollPercent={5}
        onMoveEnd={({data}) => dispatch({type: actions.SET_IMAGES, value: data})}
      />
      <Button title="Post" style={styles.button} onPress={uploadListing} />
    </View>
  );
}

const mapStateToProps = ({uploadStatus}) => ({uploadStatus});

export default connect(mapStateToProps, {uploadListing})(UploadForm);
