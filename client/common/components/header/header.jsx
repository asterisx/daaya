// @flow

import React, {useEffect, useState} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';
import {styles} from './styles';

type Props = {
  onSearchChange: ({searchTerm: string}) => void,
  searchTerm: string,
  onSearchSubmit: ({searchTerm: string}) => void,
  onGoBack: () => {},
  searchOpen: boolean,
};

const Logo = () => <Image source={require('')} style={styles.headerLogo} />;

const Header = ({children, onGoBack}: {children: *, onGoBack: () => {}}) => (
  <View style={styles.headerContainer}>
    <Icon name="arrow-back" onPress={onGoBack} />
    <Logo />
    {children}
  </View>
);

const HomeHeader = ({onSearchClick}: {onSearchClick: () => {}}) => (
  <View style={styles.homeHeaderContainer}>
    <Logo />
    <Text>Daaya</Text>
    <Icon name="arrow-back" onPress={onSearchClick} />
  </View>
);

const SimpleHeader = ({title, onGoBack}: {title: string}) => (
  <Header onGoBack={onGoBack}>
    <Text style={styles.headerTitle}>{title}</Text>
  </Header>
);

const SearchHeader = ({
  onSearchChange,
  searchTerm,
  onSearchSubmit,
  onGoBack,
  searchOpen,
}: Props) => {
  const [searchInputVisible, setSearchInputVisible] = useState(searchOpen);

  useEffect(() => {
    setSearchInputVisible(searchOpen);
  }, [searchOpen]);
  return (
    <Header onGoBack={onGoBack}>
      <View style={styles.searchContainer}>
        <Icon
          name={searchInputVisible ? 'cancel' : 'search'}
          onPress={() => setSearchInputVisible(visible => !visible)}
        />
        {searchInputVisible && (
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={searchTerm => onSearchChange({searchTerm})}
            keyboardType="default"
            returnKeyType="search"
            onSubmitEditing={() => {
              onSearchSubmit({searchTerm});
            }}
            value={searchTerm}
          />
        )}
      </View>
    </Header>
  );
};

export {HomeHeader, SimpleHeader, SearchHeader};
