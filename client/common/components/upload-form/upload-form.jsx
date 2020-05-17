// @flow

import React, {useEffect, useReducer, useState} from 'react';
import {
  TouchableOpacity,
  Picker,
  Switch,
  Text,
  TextInput,
  View,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import {Icon, Divider} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import uniqBy from 'lodash.uniqby';

import {addListingThunk} from '../../../store/thunks';
import {styles} from './styles';
import type {category, listingType} from '../../types';
import {colors, commonStyles} from '../../styles';
import LocationPicker from '../location-picker';
import {ActionButton, InputField, ListingImage} from './components';

type props = {
  categories?: Array<category>,
  addListing: ({
    title: string,
    category: number,
    description?: string,
    images: Array<string>,
    showAddress: boolean,
    showContact: boolean,
    isDraft?: boolean,
  }) => void,
  listing?: listingType,
};

const showImagePicker = ({
  callback,
}: {
  callback: ({source: string}) => void,
}) => {
  const options = {
    title: 'Upload Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  ImagePicker.showImagePicker(options, response => {
    if (!response.didCancel && !response.error) {
      const source = {
        data: 'data:image/jpeg;base64,' + response.data,
        uri: response.uri,
      };
      callback({source});
    }
  });
};

const actions = {
  SET_TITLE: 'SET_TITLE',
  SET_CATEGORY: 'SET_CATEGORY',
  ADD_IMAGE: 'ADD_IMAGE',
  SET_IMAGES: 'SET_IMAGES',
  DELETE_IMAGE: 'DELETE_IMAGE',
  SET_SHOW_ADDRESS: 'SET_SHOW_ADDRESS',
  SET_SHOW_CONTACT: 'SET_SHOW_CONTACT',
  SET_TELEPHONE: 'SET_TELEPHONE',
  SET_ADDRESS: 'SET_ADDRESS',
  SET_DESCRIPTION: 'SET_DESCRIPTION',
};

const initialState = {
  title: '',
  category: 0,
  description: '',
  images: [],
  address: {
    formatted: '',
    lat: null,
    lng: null,
  },
  showAddress: true,
  showContact: true,
  telephone: '',
};

const reducer = (state, action) => {
  const {type, value} = action;
  switch (type) {
    case actions.SET_TITLE:
      return {...state, title: value};
    case actions.SET_DESCRIPTION:
      return {...state, description: value};
    case actions.SET_CATEGORY:
      return {...state, category: value};
    case actions.ADD_IMAGE:
      return {...state, images: uniqBy([...state.images, value], 'uri')};
    case actions.SET_IMAGES:
      return {...state, images: value};
    case actions.DELETE_IMAGE:
      return {...state, images: state.images.filter(({uri}) => uri !== value)};
    case actions.SET_SHOW_ADDRESS:
      return {...state, showAddress: value};
    case actions.SET_SHOW_CONTACT:
      return {...state, showContact: value};
    case actions.SET_ADDRESS:
      return {...state, address: value};
    case actions.SET_TELEPHONE:
      return {...state, telephone: value};
    default:
      return state;
  }
};

const UploadForm = ({
  onClose,
  addListing,
  categories,
  listing,
}: props): React$Node => {
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [
    {
      title,
      images,
      description,
      category,
      address,
      showAddress,
      showContact,
      telephone,
    },
    dispatch,
  ] = useReducer(
    reducer,
    listing
      ? {
          title: listing.title,
          images: listing.images,
          category: listing.category.id,
          showAddress: listing.address,
          showContact: listing.telephone,
          telephone: listing.telephone,
        }
      : initialState,
  );

  useEffect(() => {
    if (categories.length) {
      dispatch({type: actions.SET_CATEGORY, value: categories[0].id});
    }
  }, [categories]);

  return (
    <View style={styles.container}>
      <View style={styles.closeContainer}>
        <Icon name="close" onPress={onClose} />
      </View>

      <InputField iconName="title" noMarginTop>
        <TextInput
          placeholder="Type your title..."
          style={[commonStyles.flex1, commonStyles.marginLeft10]}
          value={title}
          numberOfLines={1}
          onChangeText={text =>
            dispatch({type: actions.SET_TITLE, value: text})
          }
        />
      </InputField>

      <InputField
        iconName="options-vertical"
        iconType="simple-line-icon"
        alignItemsCenter>
        {categories ? (
          <Picker
            style={[
              styles.categoriesHeight,
              commonStyles.flex1,
              commonStyles.marginLeft10,
            ]}
            itemStyle={commonStyles.heightFull}
            selectedValue={category}
            onValueChange={value =>
              dispatch({type: actions.SET_CATEGORY, value})
            }>
            {categories.map(({id, value}: category) => (
              <Picker.Item key={id} label={value} value={id} />
            ))}
          </Picker>
        ) : (
          <Text
            style={[
              commonStyles.heightFull,
              commonStyles.flex1,
              commonStyles.marginLeft10,
            ]}>
            Loading Categories...
          </Text>
        )}
      </InputField>

      <InputField iconName="call">
        <View style={[commonStyles.flex1, commonStyles.flexRowAlignCenter]}>
          <TextInput
            editable={showContact}
            selectTextOnFocus={showContact}
            placeholder="Type the contact number..."
            style={[
              commonStyles.flex1,
              commonStyles.marginLeft10,
              {opacity: showContact ? 1 : 0.4},
            ]}
            value={telephone}
            numberOfLines={1}
            onChangeText={text =>
              dispatch({type: actions.SET_TELEPHONE, value: text})
            }
          />
          <Switch
            style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
            value={showContact}
            onValueChange={value =>
              dispatch({type: actions.SET_SHOW_CONTACT, value})
            }
          />
        </View>
      </InputField>

      <InputField iconName="place">
        <View
          style={[
            commonStyles.flex1,
            commonStyles.flexRowAlignCenter,
          ]}>
          <TextInput
            editable={showAddress}
            selectTextOnFocus={showAddress}
            placeholder="Type the address..."
            style={[
              commonStyles.flex1,
              commonStyles.marginLeft10,
              {opacity: showAddress ? 1 : 0.4},
            ]}
            value={address.formatted}
            numberOfLines={1}
            onChangeText={text =>
              dispatch({
                type: actions.SET_ADDRESS,
                value: {...address, formatted: text},
              })
            }
          />
          <Icon
            name="edit-location"
            color="orange"
            onPress={() => setShowLocationPicker(true)}
          />
          <Switch
            style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
            value={showAddress}
            onValueChange={value =>
              dispatch({type: actions.SET_SHOW_ADDRESS, value})
            }
          />
        </View>
      </InputField>

      <InputField iconName="description">
        <TextInput
          placeholder="Add a description"
          multiline
          numberOfLines={10}
          style={[commonStyles.flex1, commonStyles.marginLeft10, {height: 50}]}
          value={description}
          onChangeText={text =>
            dispatch({type: actions.SET_DESCRIPTION, value: text})
          }
        />
      </InputField>

      <TouchableOpacity style={[commonStyles.flexRowJustifyAlignCenter]}>
        <TouchableOpacity
          onPress={() =>
            showImagePicker({
              callback: ({source}) => {
                if (images.find(({data}) => data === source.data)) {
                  Alert.alert('You have already added the image');
                } else {
                  dispatch({type: actions.ADD_IMAGE, value: source});
                }
              },
            })
          }>
          <Text style={[commonStyles.fontBlue, commonStyles.fontLarge]}>
            + Add Images
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <ScrollView>
        <View
          style={[
            commonStyles.marginTop20,
            commonStyles.widthFull,
            commonStyles.flex1,
            commonStyles.flexRow,
            commonStyles.flexWrap,
          ]}>
          {images.map(image => (
            <ListingImage
              key={image.uri}
              uri={image.uri}
              onDelete={() => {
                dispatch({type: actions.DELETE_IMAGE, value: image.uri});
              }}
            />
          ))}
        </View>
      </ScrollView>

      <Divider />

      <View
        style={[
          commonStyles.flexRowAlignCenter,
          commonStyles.spaceBetween,
          commonStyles.marginBottom15,
        ]}>
        <ActionButton
          disabled={!title.length && !images.length}
          title="Save Draft"
          onPress={() => {
            addListing({
              title,
              category,
              images: images.map(({data}) => data),
              isDraft: true,
            });
            onClose();
          }}
          iconName="create"
        />

        <ActionButton
          title="Post"
          disabled={!title.length && !images.length}
          iconName="done"
          onPress={() => {
            addListing({
              title,
              category,
              images: images.map(({data}) => data),
              isDraft: false,
            });
            onClose();
          }}
          color={colors.success}
        />
      </View>

      <Modal visible={showLocationPicker}>
        <LocationPicker
          address={address}
          onClose={({address, location: {latitude, longitude}}) => {
            dispatch({
              type: actions.SET_ADDRESS,
              value: {
                formatted: address,
                lat: latitude,
                lng: longitude,
              },
            });
            setShowLocationPicker(false);
          }}
        />
      </Modal>
    </View>
  );
};

const mapStateToProps = ({meta: {categories}}) => ({
  categories,
});

const mapDispatchToProps = {addListing: addListingThunk};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadForm);
