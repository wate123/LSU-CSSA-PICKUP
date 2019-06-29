/*
 *
 * NotFound actions
 *
 */

import { GET_IMAGE, GET_IMAGE_ERROR, GET_IMAGE_SUCCESS } from './constants';

export function getImage() {
  return {
    type: GET_IMAGE,
  };
}
export function getImageSuccess(image) {
  return {
    type: GET_IMAGE_SUCCESS,
    image,
  };
}
export function getImageError(err) {
  return {
    type: GET_IMAGE_ERROR,
    err,
  };
}
