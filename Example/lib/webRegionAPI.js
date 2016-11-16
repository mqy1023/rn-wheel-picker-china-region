
const REGION_URL = 'https://raw.githubusercontent.com/beefe/react-native-picker/master/example/PickerTest/area.json';

const fetchRegionData = () => {
  return new Promise((resolve, reject) => {
    fetch(REGION_URL)
      .then((response) => response.json())
      .then((area) => {
        resolve(area);
      }).catch(err => reject(err));
  });
};
export default fetchRegionData;
