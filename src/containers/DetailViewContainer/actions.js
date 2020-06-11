// @flow
import type { ActionWithPayload, ActionWithoutPayload } from '../../types/actions'
import { getPictureDetails } from '../../services/API'
import { fetchFailed } from '../HomeContainer/actions'

export const PICTURE_DETAILS_FETCH_REQUESTED = 'PICTURE_DETAILS_FETCH_REQUESTED'
export const PICTURE_DETAILS_FETCH_SUCCESS = 'PICTURE_DETAILS_FETCH_SUCCESS'

export function pictureIsLoading (): ActionWithoutPayload {
  return {
    type: PICTURE_DETAILS_FETCH_REQUESTED,
  }
}

export function fetchPictureSuccess (imageDetails: Object): ActionWithPayload {
  return {
    type: PICTURE_DETAILS_FETCH_SUCCESS,
    payload: imageDetails,
  }
}

export function fetchPictureDetails (imageId: number) {
  const realId = imageId
  return async dispatch => {
    dispatch(pictureIsLoading())
    const pictureDetails = await getPictureDetails(realId)
    if (pictureDetails === null) {
      dispatch(fetchFailed('Connection error occurred.'))
    }
    dispatch(fetchPictureSuccess(pictureDetails))
  }
}
