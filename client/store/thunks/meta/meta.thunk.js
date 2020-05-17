import {
  getMeta,
  getMetaSuccess,
  getMetaError,
  refreshMeta,
  refreshMetaSuccess,
  refreshMetaError,
  fetchingMetaStatutes,
} from '../../actions/meta';
import API from '../../../common/api';

export const getMetaThunk = () => (dispatch, getState) => {
  const {meta} = getState();
  if (meta.fetchingStatus === fetchingMetaStatutes.NONE) {
    dispatch(getMeta());

    API.getMeta()
      .then(meta => dispatch(getMetaSuccess({meta})))
      .catch(() => getMetaError());
  } else {
    dispatch(refreshMeta());

    API.getMeta()
      .then(meta => dispatch(refreshMetaSuccess({meta})))
      .catch(() => refreshMetaError());
  }
};
