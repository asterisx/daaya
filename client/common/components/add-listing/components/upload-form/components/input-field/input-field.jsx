// @flow

import React from "react";
import {commonStyles} from '../../../../../../styles';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';


type Props = {
  iconName: string,
  iconType?: string,
  children: React.ElementType,
  noMarginTop?: boolean,
  alignItemsCenter?: boolean,
};

const InputField = ({
  iconName,
  iconType = 'material',
  children,
  noMarginTop = false,
  alignItemsCenter = false,
}: Props) => {
  let style = alignItemsCenter
    ? commonStyles.flexRowAlignCenter
    : commonStyles.flexRowAlignStart;
  if (!noMarginTop) {
    style = [style, commonStyles.marginTop20];
  }
  return (
    <View style={style}>
      <Icon name={iconName} color="grey" type={iconType} />
      {children}
    </View>
  );
};

export default InputField;
