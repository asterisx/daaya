// @flow

import React from 'react';
import {Card} from 'react-native-elements';
import {Alert, Image, Text, View} from 'react-native';

import {styles} from './styles';
import {ActionButton} from '../../../../../common/components';
import {deletingStatuses} from '../../../../../common/constants';
import {colors, commonStyles} from '../../../../../common/styles';

type Props = {
  title?: string,
  image?: string,
  category?: string,
  onDelete?: () => {},
  onEdit?: () => {},
  isValidDraft?: boolean,
  onPost?: () => {},
  deletingStatus?:
    | deletingStatuses.DELETING
    | deletingStatuses.DELETED
    | deletingStatuses.ERROR,
};

const confirmAction = ({title, message, onAffirmation, onCancel = () => {}}) =>
  Alert.alert(
    title,
    message,
    [
      {
        text: 'No',
        onPress: onCancel,
      },
      {
        text: 'Yes',
        onPress: onAffirmation,
      },
    ],
    {cancelable: true},
  );

const DraftUploadCard = ({
  title,
  image,
  category,
  onEdit,
  onDelete,
  deletingStatus,
  isValidDraft = false,
  onPost,
}: Props) => (
  <Card>
    {image && (
      <Image style={styles.image} resizeMode="cover" source={{uri: image}} />
    )}
    {title ? <Text style={styles.title}>{title}</Text> : null}
    {category ? <Text style={styles.category}>in {category}</Text> : null}
    <View
      style={[
        commonStyles.flexRow,
        commonStyles.spaceBetween,
        commonStyles.marginTop10,
      ]}>
      <ActionButton
        backgroundColor={colors.primary}
        icon="edit"
        onClick={onEdit}
        text={'Continue'}
      />
      {isValidDraft ? (
        <ActionButton
          backgroundColor={colors.success}
          icon="done"
          onClick={onPost}
          text="Post"
        />
      ) : null}
      <ActionButton
        disabled={deletingStatus && deletingStatuses.DELETING}
        backgroundColor={colors.danger}
        icon="delete"
        onClick={() =>
          confirmAction({
            title: 'Delete the listing?',
            message: 'This action cannot be undone',
            onAffirmation: onDelete,
          })
        }
        text={
          deletingStatus && deletingStatus === deletingStatuses.DELETING
            ? 'Deleting'
            : 'Delete'
        }
      />
    </View>
  </Card>
);

export default DraftUploadCard;
