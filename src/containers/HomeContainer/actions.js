import { getPictures } from '../../services/API'
import type { ActionWithPayload, ActionWithoutPayload } from '../../types/actions'
import { Alert } from 'react-native'

export const PICTURES_FETCH_REQUESTED = 'PICTURES_FETCH_REQUESTED'
export const PICTURES_FETCH_SUCCESS = 'PICTURES_FETCH_SUCCESS'
export const FETCH_FAILED = 'FETCH_FAILED'
export const CLEAR_PICTURES = 'CLEAR_PICTURES'

export function listIsLoading (): ActionWithoutPayload {
  return {
    type: PICTURES_FETCH_REQUESTED,
  }
}

function clearPictures (): ActionWithoutPayload {
  return {
    type: CLEAR_PICTURES,
  }
}

export function fetchListSuccess (pictures: Array<Object>, page: number, hasMore: boolean): ActionWithPayload {
  return {
    type: PICTURES_FETCH_SUCCESS,
    payload: {
      pictures,
      page,
      hasMore,
    }
  }
}

export function fetchFailed (errorMessage: string): ActionWithPayload {
  Alert.alert('Error', errorMessage)
  return {
    type: FETCH_FAILED,
    payload: errorMessage,
  }
}

export function fetchPictures (page: number, isRefresh: boolean = false): ActionWithPayload {
  const correctPage = page
  const correctIsRefresh = isRefresh
  return async dispatch => {
    dispatch(listIsLoading())
    const picturesResult = await getPictures(correctPage)
    if (picturesResult === null) {
      dispatch(fetchFailed('Connection error occurred.'))
    } else {
      if (correctIsRefresh) {
        dispatch(clearPictures())
      }
      const {pictures, page, hasMore} = picturesResult
      dispatch(fetchListSuccess(pictures, page, hasMore))
    }
  }
}
