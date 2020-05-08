// @flow

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {connect} from 'react-redux';

import {Bio, Info, Posts} from '../../common/components';
import type {institutionType} from '../../common/types';
import {useDelayedLoader} from '../../common/hooks';
import {getInstituteThunk} from '../../store/thunks';
import {fetchingStatuses} from '../../store/actions';
import {styles} from '../../common/styles';

type InstitutionProps = institutionType & {
  onPostClicked: ({id: number}) => void,
};

const sections = {
  posts: 'posts',
  info: 'info',
};

const Institution = ({bio, info, posts, onPostClicked}: InstitutionProps) => {
  const [selectedSection, setSelectedSection] = useState(sections.posts);

  return (
    <View>
      <Bio {...bio} />
      {selectedSection === sections.posts && (
        <Posts posts={posts} onPostClicked={onPostClicked} />
      )}
      {selectedSection === sections.info && <Info {...info} />}
      <View>
        <TouchableOpacity onPress={() => setSelectedSection(sections.posts)}>
          <Text>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedSection(sections.info)}>
          <Text>Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

type Props = {
  navigation: NavigationStackScreenProps,
  getInstitute: ({id: string}) => string,
  institute: institutionType | {fetchingInstituteStatus: string},
  onPostClicked: ({id: number}) => void,
};

const InstitutionPage = ({
  navigation,
  getInstitute,
  institute,
  onPostClicked,
}: Props) => {
  const showLoader = useDelayedLoader(
    institute.fetchingListingStatus === fetchingStatuses.FETCHING,
  );

  useEffect(async () => {
    if (institute.fetchingListingStatus === fetchingStatuses.NONE) {
      await getInstitute({id: navigation.getParam('id')});
    }
  }, [listing.fetchingListingStatus]);

  if (institute.fetchingListingStatus === fetchingStatuses.SUCCESS) {
    return (
      <Institution
        bio={institute.bio}
        info={institute.info}
        posts={institute.posts}
        onPostClicked={onPostClicked}
      />
    );
  } else if (
    institute.fetchingListingStatus === fetchingStatuses.FETCHING
  ) {
    return showLoader ? (
      <View style={styles.fullScreenContainer}>
        <ActivityIndicator />
        <Text style={styles.marginTop20}>Loading...</Text>
      </View>
    ) : null;
  } else if (
    institute.fetchingListingStatus === fetchingStatuses.ERROR
  ) {
    return (
      <View style={styles.fullScreenContainer}>
        <Text>Unable to fetch the listing</Text>
        <Button
          style={styles.marginTop20}
          title="Retry"
          onPress={() => getInstitute({id: navigation.getParam('id')})}
        />
      </View>
    );
  }
};

const mapStateToProps = (
  {Institutes},
  {navigation}: {navigation: NavigationStackScreenProps},
) => {
  const instituteId = navigation.getParam('id');
  const institute = Institutes.find(({id}) => id === instituteId);
  return {
    institute: institute || {
      fetchingInstituteStatus: fetchingStatuses.NONE,
    },
  };
};

const mapDispatchToProps = {
  getInstitute: getInstituteThunk,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InstitutionPage);
