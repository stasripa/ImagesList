// @flow

export const selectHiResImage = (state: Object, imageId: number) => state.detailViewReducer.hiResPictures
  .find(hiResPic => hiResPic !== null && hiResPic.id === imageId)
