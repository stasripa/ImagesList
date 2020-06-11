import { getPictures } from '../../services/API'
import type { ActionWithPayload, ActionWithoutPayload } from '../../types/actions'

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

export function fetchListFailed (errorMessage: string): ActionWithPayload {
  return {
    // TODO: implement me
  }
}

export function fetchPictures (page: number, isRefresh: boolean = false): ActionWithPayload {
  const correctPage = page
  const correctIsRefresh = isRefresh
  return async dispatch => {
    dispatch(listIsLoading())
    if (correctIsRefresh) {
      dispatch(clearPictures())
    }
    const picturesResult = await getPictures(correctPage)
    const { pictures, page, hasMore } = picturesResult
    dispatch(fetchListSuccess(pictures, page, hasMore))
  }
}
