// @flow
import * as React from 'react'
import {
  ActivityIndicator,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

import styles from './styles'
import DetailsFooter from './components/DetailsFooter'
import ImageZoom from 'react-native-image-pan-zoom'
import {
  ColorMatrix,
  concatColorMatrices,
  grayscale,
  saturate,
  sepia,
  polaroid,
  normal,
  hueRotate,
  invert,
  cool,
  warm,
  technicolor,
  browni,
  vintage,
  night,
  predator,
  lsd,
} from 'react-native-color-matrix-image-filters'

const { width, height } = Dimensions.get('window')

type Props = {
  isLoading: boolean,
  shareCallback: Function,
  pictureDetails: Object,
}

// TODO: it would be great to see here loader, pinch to zoom here and pan

class DetailView extends React.PureComponent<Props> {

  state = {
    filter: [sepia()],
    showFilters: false,
  }

  toggleFilters = () => {
    this.setState({showFilters: !this.state.showFilters})
  }

  renderImage = (isSmall: boolean = false) => {
    const { pictureDetails } = this.props
    return (
      <Image
        source={{uri: pictureDetails.full_picture}}
        style={isSmall ? styles.smallImage : styles.imageStyle} />
    )
  }

  renderZoomedImage = () => {
    const { showFilters } = this.state
    if (showFilters) {
      return null
    }

    return (
      <ImageZoom
        cropWidth={width}
        cropHeight={height}
        imageWidth={width}
        imageHeight={height}
      >
        {this.renderImage()}
      </ImageZoom>
    )
  }

  renderAppliedFilter = () => {
    const { filter, showFilters } = this.state
    if (!showFilters) {
      return null
    }

    return (
      <ColorMatrix
        matrix={concatColorMatrices([filter])}>
        {this.renderImage()}
      </ColorMatrix>
    )
  }

  renderFilterItem = (filter) => {
    return (
      <View style={styles.filterItem}>
        <TouchableOpacity onPress={()=> this.applyFilter(filter)}>
          <ColorMatrix
            matrix={concatColorMatrices([filter()])}>
            {this.renderImage(true)}
          </ColorMatrix>
        </TouchableOpacity>
      </View>
    )
  }

  renderFiltersList = () => {
    const { showFilters } = this.state
    if (!showFilters) return null

      return (
        <ScrollView style={styles.filtersContainer}
                    horizontal>
          {this.renderFilterItem(sepia)}
          {this.renderFilterItem(saturate)}
          {this.renderFilterItem(grayscale)}

          {this.renderFilterItem(polaroid)}
          {this.renderFilterItem(normal)}
          {this.renderFilterItem(hueRotate)}
          {this.renderFilterItem(invert)}
          {this.renderFilterItem(cool)}
          {this.renderFilterItem(warm)}
          {this.renderFilterItem(technicolor)}
          {this.renderFilterItem(browni)}
          {this.renderFilterItem(vintage)}
          {this.renderFilterItem(night)}
          {this.renderFilterItem(predator)}
          {this.renderFilterItem(lsd)}
        </ScrollView>
      )
  }

  applyFilter = (filter) => {
    this.setState({filter: [filter()]})
  }

  render () {
    const { showFilters } = this.state
    const { isLoading, shareCallback, pictureDetails } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {showFilters ? this.renderAppliedFilter() : this.renderZoomedImage()}
        </View>
        {this.renderFiltersList()}
        <DetailsFooter
          pictureDetails={pictureDetails}
          shareCallback={shareCallback}
          toggleFilters={this.toggleFilters}
        />
        { isLoading &&
          <View style={styles.activityIndicatorViewStyle}>
            <ActivityIndicator animating={true} size={80}/>
          </View>
        }
      </View>
    )
  }
}

export default DetailView
