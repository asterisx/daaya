// @flow

import React, {useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import debounce from 'lodash.debounce';

import type {listingType} from '../../types';
import {styles} from './styles';
import {getListingsThunk} from '../../../store/thunks/listings';
import AddListing from '../add-listing';
import {fetchingStatuses} from '../../../store/actions';
import {useDelayedLoader} from '../../hooks';
import InfiniteRefreshableScrollView from '../infinite-refreshable-scrolll-view';
import {commonStyles} from '../../styles';

type Props = {
  listings: Array<listingType>,
  onListingClick: ({id: string}) => void,
  searchTerm: string,
  fetchingListingsStatus:
    | fetchingStatuses.FETCHING
    | fetchingStatuses.ERROR
    | fetchingStatuses.SUCCESS,
};

const Listings = ({
  listings = [],
  onListingClick,
  searchTerm,
  getListings,
  fetchingListingsStatus,
}: Props) => {
  const showLoader = useDelayedLoader(
    fetchingListingsStatus === fetchingStatuses.FETCHING ||
      fetchingListingsStatus === fetchingStatuses.NONE,
  );
  const loadNext = useCallback(debounce(getListings, 100), []);

  useEffect(() => {
    getListings({searchTerm});
  }, [searchTerm, fetchingListingsStatus === fetchingStatuses.NONE]);

  return (
    <View style={[commonStyles.flex1, commonStyles.marginTop10]}>
      <InfiniteRefreshableScrollView
        canLoadMore={fetchingListingsStatus !== fetchingStatuses.FETCHING}
        loadMore={() =>
          loadNext({
            searchTerm,
            direction: 'next',
          })
        }
        onRefresh={() =>
          getListings({
            searchTerm,
            direction: 'previous',
          })
        }
        showLoader={showLoader}
        data={listings}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onListingClick({id: item.id})}>
            <Card>
              <View>
                {item.images.length ? (
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{uri: item.images[0]}}
                  />
                ) : null}
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.category}>in {item.category.value}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      <AddListing />
    </View>
  );
};

const mapStateToProps = ({Listings}, {searchTerm: stInProps}) => {
  const theListings = Listings.searchResults.find(
    ({searchTerm}) => searchTerm === stInProps,
  );
  return {
    listings: theListings ? theListings.listings : [],
    fetchingListingsStatus: theListings
      ? theListings.fetchingListingsStatus
      : fetchingStatuses.NONE,
  };
};

const mapDispatchToProps = {
  getListings: getListingsThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listings);
