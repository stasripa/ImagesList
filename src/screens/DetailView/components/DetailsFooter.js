import * as React from 'react'
import {
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native'

import styles from '../styles'
import imageFiltersImage from './images/ImageFilters.png'
import shareImage from './images/ShareThis.png'

type Props = {
  shareCallback: Function,
  colorSwitchCallback: Function,
  pictureDetails: Object,
}

class DetailsFooter extends React.PureComponent<Props> {
  render () {
    const { shareCallback, applyFilterCallback, pictureDetails } = this.props
    if (!pictureDetails) return null
    const imageId = pictureDetails.id
    return (
      <View style={styles.detailView}>
        <View>
          <Text style={styles.text}>{`Author: ${pictureDetails.author}`}</Text>
          <Text style={styles.text}>{`Camera: ${pictureDetails.camera}`}</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => applyFilterCallback()}
          >
            <Image style={styles.detailViewImage}
              resizeMode='cover'
              source={imageFiltersImage} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => shareCallback(imageId)}
          >
            <Image style={styles.detailViewImage}
              resizeMode='cover'
              source={shareImage} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default DetailsFooter
