// @flow

import React, {useState} from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';

import UploadForm from '../upload-form';
import {styles} from './styles';
import {addListingThunk} from '../../../store/thunks/profile';
import {saveDraft} from '../../../store/actions/profile';
import type {
  categoryType,
  draftListingType,
  uploadListingType,
} from '../../types';

type Props = {
  categories?: Array<categoryType>,
  addListing: uploadListingType => void,
  saveDraft: draftListingType => void,
};

export const AddListing = ({categories, addListing, saveDraft}: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalOpen(true)}>
        <Icon name="add" size={35} color="#fff" />
      </TouchableOpacity>

      <Modal visible={modalOpen} animationType="fade">
        <UploadForm
          onClose={() => setModalOpen(false)}
          categories={categories}
          addListing={addListing}
          saveDraft={saveDraft}
        />
      </Modal>
    </View>
  );
};

const mapStateToProps = ({meta: {categories}}) => ({
  categories,
});

const mapDispatchToProps = {addListing: addListingThunk, saveDraft};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddListing);
