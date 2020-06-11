import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
    width: width,
    height: height,
  },
  backButton: {
    position: 'absolute',
    left: 5,
    top: 5,
  },
  spinner: {
    position: 'absolute',
  },
  detailView: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailViewImage: {
    width: 50,
    height: 50,
  },
  text: {
    color: 'white',
  },
  row: {
    flexDirection: 'row',
  }
})
export default styles
