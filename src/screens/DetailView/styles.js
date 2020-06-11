import { Dimensions, StyleSheet } from 'react-native'
const { width, height } = Dimensions.get('window')

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  imageContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    flex: 1,
    width: width,
    height: height,
  },
  smallImage: {
    width: 150,
    height: 150,
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
  },
  filterItem: {
    marginHorizontal: 8,
  },
  filtersContainer: {
    flex: 1,
    height: 50,
    alignContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginBottom: 58,
  },
  activityIndicatorViewStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
})
export default styles
