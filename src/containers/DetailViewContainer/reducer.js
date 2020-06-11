import { PICTURE_DETAILS_FETCH_SUCCESS } from '../DetailViewContainer/actions'

const initialState = {
  hiResPictures: [],
  isLoading: false,
}

export default function (state: any = initialState, action: Object) {
  const { payload, type } = action

  switch(type) {
    case (PICTURE_DETAILS_FETCH_SUCCESS): {
      return {
        ...state,
        hiResPictures: [...state.hiResPictures, payload],
        isLoading: false,
      }
    }

    default:
      return state
  }
}
