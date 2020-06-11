// @flow
import {CLEAR_PICTURES, PICTURES_FETCH_REQUESTED, PICTURES_FETCH_SUCCESS} from '../HomeContainer/actions'

const initialState = {
  pictures: [],
  isLoading: true,
  page: 1,
  errorMessage: '',
}

export default function (state: any = initialState, action: Object) {
  const { payload, type } = action

  switch (type) {
    case CLEAR_PICTURES: {
      console.log('GOT CLEAR PICTURES ACTION')
      return {
        ...state,
        pictures: [],
        page: 1,
      }
    }

    case PICTURES_FETCH_REQUESTED: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case PICTURES_FETCH_SUCCESS: {
      const { pictures, hasMore} = payload
      for (let i = 0; i < pictures.length; i++) {
        pictures[i].page = state.page
      }
      return {
        ...state,
        pictures: [...state.pictures, ...pictures],
        page: state.page + 1,
        hasMore,
        isLoading: false,
      }
    }

    default:
      return state
  }
}
