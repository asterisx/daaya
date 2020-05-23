// @flow

import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {styles} from './styles';
import {commonStyles} from '../../styles';
import Filters from '../filters';

type Props = {
  onSearchChange: ({searchTerm: string}) => void,
  searchTerm: string,
  searchQuery: string,
  onSearchSubmit: ({searchTerm: string}) => void,
  onGoBack: () => {},
  searchOpen: boolean,
  isEditing: boolean,
  cancelEditing: () => {},
};

const Logo = () => (
  <View style={[commonStyles.marginRight5, commonStyles.flexRowAlignCenter]}>
    <Icon name="heart" type="antdesign" color="red" size={18} />
  </View>
);

const Header = ({children, onGoBack}: {children: *, onGoBack: () => {}}) => (
  <SafeAreaView>
    <View style={styles.headerContainer}>
      <Icon name="arrow-back" onPress={onGoBack} />
      {children}
    </View>
  </SafeAreaView>
);

const HomeHeader = ({onSearchClick}: {onSearchClick: () => {}}) => (
  <SafeAreaView>
    <View style={styles.homeHeaderContainer}>
      <View style={commonStyles.flexRowJustifyAlignCenter}>
        <Logo />
        <Text style={{fontSize: 17}}>Daaya</Text>
      </View>

      <View style={commonStyles.flexRowJustifyAlignCenter}>
        <View
          style={[commonStyles.flexRowAlignCenter, commonStyles.marginRight5]}>
          <Icon
            name="search"
            style={[commonStyles.marginRight5]}
            onPress={onSearchClick}
          />
        </View>

        <Filters searchTerm="" />
      </View>
    </View>
  </SafeAreaView>
);

const HeaderWrapper = ({children, onGoBack}) => (
  <Header onGoBack={onGoBack}>{children}</Header>
);

const SimpleHeader = ({title, onGoBack}: {title: string}) => (
  <Header onGoBack={onGoBack}>
    <Text style={styles.headerTitle}>{title}</Text>
  </Header>
);

const SearchHeader = ({
  onSearchChange,
  searchTerm,
  searchQuery,
  onSearchSubmit,
  onGoBack,
  searchOpen,
  isEditing,
  cancelEditing,
}: Props) => {
  const [searchInputVisible, setSearchInputVisible] = useState(searchOpen);

  useEffect(() => {
    setSearchInputVisible(searchOpen);
  }, [searchOpen]);
  return (
    <Header onGoBack={onGoBack}>
      <View style={styles.searchContainer}>
        <Filters searchTerm={searchTerm} hide={isEditing} />
        <View
          style={[commonStyles.flexRowAlignCenter, commonStyles.marginRight5]}>
          <Icon
            name={searchInputVisible ? 'cancel' : 'search'}
            onPress={() => {
              setSearchInputVisible(visible => !visible);
              cancelEditing();
            }}
          />
        </View>

        {searchInputVisible ? (
          <TextInput
            style={[
              commonStyles.flex1,
              {
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                paddingHorizontal: 2,
                paddingBottom: 2,
              },
              commonStyles.marginRight5,
            ]}
            placeholder="Search..."
            onChangeText={searchTerm => onSearchChange({searchTerm})}
            keyboardType="default"
            returnKeyType="search"
            onSubmitEditing={() => {
              onSearchSubmit({searchQuery});
            }}
            value={searchQuery}
            autoFocus
          />
        ) : (
          <TouchableOpacity
            style={[commonStyles.flex1]}
            onPress={() => {
              setSearchInputVisible(visible => !visible);
              cancelEditing();
            }}>
            <Text>{`"${searchTerm}"`}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Header>
  );
};

export {HomeHeader, SimpleHeader, SearchHeader, HeaderWrapper};
