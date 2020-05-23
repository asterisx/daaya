// @flow

import React, {useState} from 'react';
import {Badge, Icon} from 'react-native-elements';
import {Modal, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import isEqual from 'lodash.isequal';

import {FiltersForm} from './components';
import type {category, searchFilterType} from '../../types';
import {changeFilters} from '../../../store/actions/listings';
import type {changeFiltersProps} from '../../../store/actions/listings';
import {fetchingStatuses} from '../../../store/actions';

type Props = {
  searchTerm: string,
  searchFilters?: searchFilterType,
  changeFilters: changeFiltersProps => void,
  hide?: boolean,
  categories: Array<category>,
  areCategoriesLoading: boolean,
};

const hasFilters = ({searchFilters, categories}) =>
  searchFilters &&
  (searchFilters.categories.length !== categories.length ||
    searchFilters.location ||
    searchFilters.range);

const Filters = ({
  searchTerm,
  searchFilters,
  changeFilters,
  hide = false,
  categories,
  areCategoriesLoading,
}: Props) => {
  const [modalOpen, setModalOpen] = useState(false);

  return !hide ? (
    <View>
      <TouchableOpacity onPress={() => !hide && setModalOpen(true)}>
        <Icon
          name="filter"
          type="font-awesome"
          size={22}
          color="#000"
          disabledStyle={{color: 'grey'}}
          disabled={areCategoriesLoading}
        />
      </TouchableOpacity>
      {hasFilters({searchFilters, categories}) ? (
        <Badge
          status="error"
          containerStyle={{position: 'absolute', top: 0, right: -4}}
        />
      ) : null}

      <Modal visible={modalOpen} animationType="fade">
        <FiltersForm
          onApplyFilters={newFilters => {
            if (!isEqual(newFilters, searchFilters)) {
              changeFilters({
                searchTerm,
                searchFilters: newFilters,
              });
            }
            setModalOpen(false);
          }}
          categories={categories}
          onClose={() => setModalOpen(false)}
          currentFilters={searchFilters}
        />
      </Modal>
    </View>
  ) : null;
};

const mapStateToProps = (
  {Listings, meta: {categories, fetchingStatus}},
  {searchTerm: stInProps},
) => {
  const theListings = Listings.searchResults.find(
    ({searchTerm}) => searchTerm === stInProps,
  );
  return {
    searchFilters: theListings ? theListings.searchFilters : undefined,
    categories,
    areCategoriesLoading:
      fetchingStatus === fetchingStatuses.FETCHING ||
      fetchingStatus === fetchingStatuses.ERROR,
  };
};

const mapDispatchToProps = {
  changeFilters,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filters);
