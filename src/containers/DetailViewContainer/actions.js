// @flow

//import { getPictureDetails } from 'services/API'
import { FETCH_FAILED } from '../HomeContainer/actions'
import type { ActionWithPayload, ActionWithoutPayload } from '../../types/actions'
import { getPictureDetails } from '../../services/API'

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

export function fetchPictureFailed (errorMessage: string): ActionWithPayload {
  return {
    // TODO: implement me

  }
}

export function fetchPictureDetails (imageId: number) {
  const realId = imageId
  return async dispatch => {
    dispatch(pictureIsLoading())
    const pictureDetails = await getPictureDetails(realId)
    console.log('GOT SOME PICTURE DETAILS', pictureDetails)
    dispatch(fetchPictureSuccess(pictureDetails))
  }
}
