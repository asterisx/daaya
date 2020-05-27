// @flow

import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import {colors, commonStyles} from '../../styles';

type Props = {
  canLoadMore: boolean,
  loadMore: () => {},
  onRefresh: () => {},
  showLoader: boolean,
  data: *,
  renderItem: *,
  keyExtractor: *,
};

const InfiniteRefreshableScrollView = ({
  canLoadMore,
  loadMore,
  onRefresh,
  data,
  renderItem,
  keyExtractor,
  showLoader,
}: Props) => (
  <View>
    <FlatList
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
      onEndReached={() => {
        if (canLoadMore) {
          loadMore();
        }
      }}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
    {showLoader ? (
      <View
        style={[
          {position: 'absolute', height: 50},
          commonStyles.flexRowJustifyAlignCenter,
          commonStyles.widthFull,
        ]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    ) : null}
  </View>
);

export default InfiniteRefreshableScrollView;
