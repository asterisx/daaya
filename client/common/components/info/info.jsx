// @flow

import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Address, Tel, Email} from '../';
import type {institutionInfo} from "../../types";

import {styles} from "./styles";

const Separator = () => <View />;

const Info = ({
  addresses,
  telephones,
  emails,
  workingTimes,
}: institutionInfo) => (
  <View>
    <Separator />
    <FlatList
      contentContainerStyle={styles.addressContainer}
      data={addresses}
      renderItem={({item}) => (
        <Address
          index={item.address}
          address={item.address}
          location={item.location}
        />
      )}
    />
    <Separator />
    <FlatList
      contentContainerStyle={styles.telContainer}
      data={telephones}
      renderItem={({item}) => (
        <Tel
          index={item.number}
          name={item.name}
          number={item.number}
        />
      )}
    />
    <Separator />
    <FlatList
      contentContainerStyle={styles.emailContainer}
      data={emails}
      renderItem={({item}) => (
        <Email
          index={k}
          name={item.name}
          email={item.email}
        />
      )}
    />
    <Separator />
    <FlatList
      contentContainerStyle={styles.workingTimesContainer}
      data={workingTimes}
      renderItem={({item}) => <Text>{item}</Text>}
    />
  </View>
);

export default Info;
