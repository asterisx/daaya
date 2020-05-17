// @flow

import React from 'react';
import {Button} from 'react-native-elements';

import {colors} from '../../../../styles';
import {styles} from './styles';

type Props = {
  title: string,
  disabled: boolean,
  iconName: string,
  color?: string,
  onPress: () => {},
};

const ActionButton = ({
  title,
  disabled,
  iconName,
  color = colors.primary,
  onPress,
}: Props) => (
  <Button
    disabled={disabled}
    disabledStyle={styles.disabledStyle}
    title={title}
    icon={{name: iconName, color}}
    onPress={onPress}
    titleStyle={[styles.titleStyle, {color}]}
    type="clear"
  />
);

export default ActionButton;
