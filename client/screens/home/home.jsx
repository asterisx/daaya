// @flow

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getListings} from '../../store/thunks';
import {Listings} from '../../common/components';
import type {post} from '../../common/types';

type Props = {
  listings: Array<post>,
  getListings: ({searchTerm: string, link: string}) => void,
  onListingClick: ({id: number}) => void,
};

const Home = ({listings, getListings, onListingClick}: Props) => {
  useEffect(getListings, []);
  return <Listings listings={listings} onListingClick={onListingClick} />;
};

const mapStateToProps = ({listings}) => {
  const homeListings = listings.searchResults.find(
    ({searchTerm}) => !!searchTerm,
  );
  return {
    listings: homeListings,
  };
};

const mapDispatchToProps = {
  getListings,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
