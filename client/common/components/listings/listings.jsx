// @flow

import React from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Header, Card} from 'react-native-elements';
import type {post} from "../../types";
import {styles} from './styles';


type Props = {
  listings: Array<post>,
  onListingClick: ({id: number}) => void,
};

const Listings = ({listings, onListingClick}: Props) => (
  <View style={styles.main}>
    <Header
      backgroundColor="#fff"
      leftComponent={{icon: 'menu', color: '#000'}}
      centerComponent={{text: 'Daaya', style: {color: '#000'}}}
      rightComponent={{icon: 'search', color: '#000'}}
    />
    <ScrollView>
      <View style={styles.container}>
        {listings.map(listing => (
          <TouchableOpacity onPress={() => onListingClick({id: listing.id})}>
            <Card>
              <View>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{uri: listing.img}}
                />
                <Text style={styles.title}>{listing.title}</Text>
                <Text style={styles.category}>in {listing.category}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  </View>
);

export default Listings;
