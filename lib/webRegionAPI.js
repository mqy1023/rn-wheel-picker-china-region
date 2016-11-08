
const REGION_URL = 'https://raw.githubusercontent.com/beefe/react-native-picker/master/example/PickerTest/area.json';
const fetchRegionData = () => {
  return fetch(REGION_URL)
      .then((response) => response.json())
      .then((area) => {
        return area;
      }).catch(err => (console.log(err)));
};

export default fetchRegionData;
