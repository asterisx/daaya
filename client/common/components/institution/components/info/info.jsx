// @flow

import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Address, Tel, Email} from './components';
import type {location} from "../../../../types";

type address = {
    address: string,
    location: location
}

type telephone = {
    name: string,
    number: number,
}

type email = {
    name: string,
    email: string,
}

type Props = {
    addresses: Array<address>,
    telephones: Array<telephone>,
    emails: Array<email>,
    workingTimes: Array<string>,
    onOpenMap: ({location: location}) => void,
    onPressSms: ({number: number}) => void,
    onPressTel: ({number: number}) => void,
    onPressWhatsApp: ({number: number}) => void,
    onePressEmail: ({email: string}) => void,
}

const Separator = () => <View />;

const Info = ({
  addresses,
  telephones,
  emails,
  workingTimes,
  onOpenMap,
  onPressSms,
  onPressTel,
  onPressWhatsApp,
  onePressEmail,
}: Props) => (
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
          onOpenMap={onOpenMap}
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
          onPressSms={onPressSms}
          onPressTel={onPressTel}
          onPressWhatsApp={onPressWhatsApp}
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
          onePressEmail={onePressEmail}
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
