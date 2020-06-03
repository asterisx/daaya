// @flow

import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {showMessage} from 'react-native-flash-message';

import EditListing from '../../../../../common/components/edit-listing';
import API from '../../../../../common/api/api';
import {useDelayedLoader} from '../../../../../common/hooks';
import {ScreenLoader} from '../../../../../common/components';
import {commonStyles} from '../../../../../common/styles';
import {styles} from './styles';

type Props = {
  listingId: string,
  onClose: () => {},
};

export const UpdateListing = ({listingId, onClose, ...otherProps}: Props) => {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState();
  const showLoader = useDelayedLoader(loading);

  useEffect(() => {
    API.getListing({id: listingId})
      .then(listing => {
        setListing(listing);
        setLoading(false);
      })
      .catch(() => {
        showMessage({
          message: 'There was some error loading the listing',
          type: 'danger',
          icon: 'danger',
        });
        onClose();
      });

    return () => {
      setLoading(true);
      setListing(undefined);
    };
  }, [listingId]);

  return loading ? (
    <View
      style={[commonStyles.fullScreenContainer, commonStyles.positionAbsolute]}>
      {showLoader ? (
        <View
          style={[
            commonStyles.flexRowJustifyAlignCenter,
            styles.loadingContainer,
          ]}>
          <ScreenLoader />
        </View>
      ) : null}
    </View>
  ) : (
    <EditListing listing={listing} onClose={onClose} {...otherProps} />
  );
};

export default UpdateListing;
