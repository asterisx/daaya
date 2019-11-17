import React, {useState} from 'react';
import {Button, Image, Picker, Text, TextInput, View} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {connect} from 'react-redux';
import {uploadListing} from '../thunks';
import {styles} from './styles';
import type {category} from "../../types";

type props = {
  uploadStatus: string,
  categories: Array<category>,
};

function UploadForm({uploadStatus, uploadListing, categories}: props) {
  const [title, setTitle] = useState('');
  const [images, setImage] = useState([]);
  const [category, setCategory] = useState(categories[0].id);

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <TextInput value={title} onChangeText={text => setTitle(text)} />
      <Picker
        selectedValue={category}
        onValueChange={(value) =>
            setCategory(value)
        }>
          {categories.map(({id, value}: category) => <Picker.Item label={value} value={id} />)}
      </Picker>
      <DraggableFlatList
        data={images}
        renderItem={({item}) => <Image source={item} />}
        keyExtractor={item => `${item.key}`}
        scrollPercent={5}
        onMoveEnd={({data}) => setImage(data)}
      />
      <Button title="Post" style={styles.button} onPress={uploadListing} />
    </View>
  );
}

const mapStateToProps = ({uploadStatus}) => ({uploadStatus});

export default connect(mapStateToProps, {uploadListing})(UploadForm);
