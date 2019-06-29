/*
 *
 * NotFound reducer
 *
 */
import produce from 'immer';
import { GET_IMAGE, GET_IMAGE_SUCCESS, GET_IMAGE_ERROR } from './constants';

export const initialState = {
  loading: false,
  image: '',
};

/* eslint-disable default-case, no-param-reassign */
const notFoundReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_IMAGE:
        draft.loading = true;
        break;
      case GET_IMAGE_SUCCESS:
        draft.loading = false;
        draft.image = action.image.url;
        break;
      case GET_IMAGE_ERROR:
        draft.loading = true;
        break;
    }
  });

export default notFoundReducer;
