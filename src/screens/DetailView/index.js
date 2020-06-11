// @flow
import * as React from 'react'
import {
  View,
  Image, Dimensions,
} from 'react-native'

import styles from './styles'
import DetailsFooter from './components/DetailsFooter'
import ImageZoom from 'react-native-image-pan-zoom'

const { width, height } = Dimensions.get('window')

type Props = {
  isLoading: boolean,
  shareCallback: Function,
  applyFilterCallback: Function,
  pictureDetails: Object,
}

// TODO: it would be great to see here loader, pinch to zoom here and pan

class DetailView extends React.PureComponent<Props> {
  render () {
    const { isLoading, shareCallback, applyFilterCallback, pictureDetails } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageZoom
            cropWidth={width}
            cropHeight={height}
            imageWidth={width}
            imageHeight={height}
          >
            <Image
              source={{uri: pictureDetails.full_picture}}
              style={styles.imageStyle} />
          </ImageZoom>
        </View>
        <DetailsFooter
          pictureDetails={pictureDetails}
          shareCallback={shareCallback}
          applyFilterCallback={applyFilterCallback}
        />
      </View>
    )
  }
}

export default DetailView
