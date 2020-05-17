// @flow

import React, {useState} from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import UploadForm from '../upload-form';
import {styles} from './styles';

export const AddListing = ({}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalOpen(true)}>
        <Icon
          name="add"
          size={35}
          color="#fff"
        />
      </TouchableOpacity>

      <Modal visible={modalOpen} animationType="fade">
        <UploadForm onClose={() => setModalOpen(false)} />
      </Modal>
    </View>
  );
};

export default AddListing;
