// @flow

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';

import {commonStyles} from '../../styles';
import {styles} from '../upload-card/styles';

type Props = {
  text: string,
  backgroundColor: string,
  icon: string,
  onClick: () => {},
  type?: string,
  disabled?: boolean,
};

const ActionButton = ({
  text,
  backgroundColor,
  icon,
  onClick,
  type = 'material',
  disabled = false,
}: Props) => (
  <TouchableOpacity onPress={onClick} disabled={disabled}>
    <View
      style={[
        commonStyles.flexRowJustifyAlignCenter,
        commonStyles.paddingVertical5,
        {backgroundColor},
        styles.button,
        {opacity: disabled ? 0.5 : 1.0},
      ]}>
      <View
        style={[commonStyles.flexRowAlignCenter, commonStyles.marginRight5]}>
        <Icon name={icon} color="#fff" type={type} size={16} />
      </View>
      <Text style={[commonStyles.fontWhite]}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default ActionButton;
