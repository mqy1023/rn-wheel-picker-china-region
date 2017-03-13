import cityData from './regionJson';
const REGION_URL = 'https://raw.githubusercontent.com/beefe/react-native-picker/master/example/PickerTest/area.json';

const fetchRegionData = () => {
  return new Promise((resolve, reject) => {
    resolve(cityData);
  })
};

export default fetchRegionData;
