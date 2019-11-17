// @flow

import React from 'react';
import {Listings} from '../../common/components';
import type {post} from '../../common/types';

type Props = {
  listings: Array<post>,
  onListingClick: ({id: number}) => void,
};

const Search = ({listings, onListingClick}: Props) => (
  <Listings listings={listings} onListingClick={onListingClick} />
);

export default Search;
