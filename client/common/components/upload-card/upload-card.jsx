// @flow

import React from 'react';
import {Card} from 'react-native-elements';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';

import {styles} from './styles';
import {commonStyles} from '../../styles';
import {deletingStatuses, uploadStatuses} from '../../constants';
import {colors} from '../../styles';
import ActionButton from '../action-button';

const StatusText = ({text, icon, type = 'material', size = 28}) => (
  <View
    style={[
      commonStyles.flexRowJustifyAlignCenter,
      commonStyles.paddingVertical5,
      commonStyles.paddingHorizontal5,
    ]}>
    <View style={[commonStyles.flexRowAlignCenter, commonStyles.marginRight5]}>
      <Icon name={icon} size={size} type={type} color="grey" />
    </View>
    <Text style={[styles.status]}>{text}</Text>
  </View>
);

type Props = {
  title?: string,
  image?: string,
  category?: string,
  onReUpload?: () => {},
  onDelete?: () => {},
  onEdit?: () => {},
  cancelUpload?: () => {},
  status?:
    | uploadStatuses.UPLOADED
    | uploadStatuses.UPLOADING
    | uploadStatuses.ERROR,
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

const CardContent = ({
  onReUpload,
  onDelete,
  onEdit,
  cancelUpload,
  status,
  deletingStatus,
}) => (
  <>
    {status === uploadStatuses.UPLOADING && (
      <View
        style={[
          commonStyles.flexRow,
          commonStyles.spaceBetween,
          commonStyles.marginTop10,
        ]}>
        <StatusText
          text="Uploading"
          icon="hourglass-half"
          type="font-awesome"
          size={14}
        />
        <ActionButton
          backgroundColor={colors.danger}
          icon="close"
          onClick={() =>
            confirmAction({
              title: 'Cancel Uploading?',
              message: 'The listing will be deleted',
              onAffirmation: cancelUpload,
            })
          }
          text="Cancel"
          type="font-awesome"
        />
      </View>
    )}
    {status === uploadStatuses.ERROR && (
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
          text="Edit"
        />
        <ActionButton
          backgroundColor={colors.danger}
          icon="undo"
          type="font-awesome"
          onClick={onReUpload}
          text="Retry"
        />
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
    )}
    {status === uploadStatuses.CANCELLING && (
      <View
        style={[
          commonStyles.flexRowReverse,
          commonStyles.marginTop10,
        ]}>
        <ActionButton
          disabled
          backgroundColor={colors.danger}
          icon="close"
          onClick={() => {}}
          text="Cancelling"
          type="font-awesome"
        />
      </View>
    )}
    {status === uploadStatuses.CANCEL_ERROR && (
      <View
        style={[
          commonStyles.flexRow,
          commonStyles.spaceBetween,
          commonStyles.marginTop10,
        ]}>
        <StatusText text="Cancel Error" icon="error" size={14} />
        <ActionButton
          backgroundColor={colors.danger}
          icon="undo"
          type="font-awesome"
          onClick={cancelUpload}
          text="retry"
        />
      </View>
    )}
  </>
);

const UploadCard = ({
  title,
  image,
  category,
  onReUpload,
  onDelete,
  onEdit,
  cancelUpload,
  status,
  deletingStatus,
}: Props) => (
  <TouchableOpacity
    onPress={() => status === uploadStatuses.UPLOADED && openListing()}
    disabled={
      deletingStatus &&
      deletingStatuses.DELETING &&
      status === uploadStatuses.UPLOADED
    }>
    <Card>
      <View>
        {image && (
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{uri: image}}
          />
        )}
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {category ? <Text style={styles.category}>in {category}</Text> : null}
      </View>
      <CardContent
        cancelUpload={cancelUpload}
        onDelete={onDelete}
        onReUpload={onReUpload}
        deletingStatus={deletingStatuses}
        onEdit={onEdit}
        status={status}
      />
    </Card>
  </TouchableOpacity>
);

export default UploadCard;
