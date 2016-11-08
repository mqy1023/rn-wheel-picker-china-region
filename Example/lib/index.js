
import React, { PropTypes } from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  PickerIOS,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import BaseComponent from './BaseComponent';
import webRegionAPI from './webRegionAPI';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ChinaRegionWheelPicker extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind(
      'open',
      'close',
      '_handleProvinceChange',
      '_handleCityChange',
      '_handleAreaChange',
      '_handleSubmit',
      '_handleCancel',
    );
    this.state = {
      isVisible: this.props.isVisible,
      provinces: [],
      citys: [],
      areas: [],
      selectedProvince: this.props.selectedProvince,
      selectedCity: this.props.selectedCity,
      selectedArea: this.props.selectedArea,
      transparent: true,
    };
  }
  _filterAllProvinces() {
    return this._regionAllData.map((item) => {
      return item.name;
    });
  }
  _filterCitys(province) {
    const provinceData = this._regionAllData.find(item => item.name === province);
    return provinceData.city.map(item => item.name);
  }
  _filterAreas(province, city) {
    const provinceData = this._regionAllData.find(item => item.name === province);
    const cityData = provinceData.city.find(item => item.name === city);
    return cityData.area;
  }

  componentDidMount() {
    webRegionAPI().then((area) => {
      // console.log('area', area);
      this._regionAllData = area;

      const provinces = this._filterAllProvinces();
      // console.log('provinces', provinces);

      const citys = this._filterCitys(this.state.selectedProvince);

      const areas = this._filterAreas(this.state.selectedProvince, this.state.selectedCity);

      this.setState({
        provinces,
        citys,
        areas
      });
    });
  }
  componentWillReceiveProps(props) {
    if (props.isVisible !== this.props.isVisible) {
      if (props.isVisible) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  close() {
    this.setState({ isVisible: false });
  }
  open() {
    this.setState({ isVisible: true });
  }

  _handleProvinceChange(province) {
    const citys = this._filterCitys(province);
    const areas = this._filterAreas(province, citys[0]);
    this.setState({
      selectedProvince: province,
      selectedCity: citys[0],
      selectedArea: areas[0],
      citys,
      areas
    });
  }
  _handleCityChange(city) {
    const areas = this._filterAreas(this.state.selectedProvince, city);
    this.setState({
      selectedCity: city,
      selectedArea: areas[0],
      areas
    });
  }
  _handleAreaChange(area) {
    this.setState({
      selectedArea: area,
    });
  }

  _handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this.close();
  }
  _handleSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        province: this.state.selectedProvince,
        city: this.state.selectedCity,
        area: this.state.selectedArea
      });
    }
    this.close();
  }

  renderPicker() {
    const { navBtnColor } = this.props;
    return (
      <View style={styles.overlayStyle}>
        <View style={styles.pickerContainer}>
          <View style={styles.navWrap}>
            <TouchableOpacity
              style={[styles.navBtn, { borderColor: navBtnColor }]}
              activeOpacity={0.85}
              onPress={this._handleCancel}
            >
              <Text style={[styles.text, { color: navBtnColor }]}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navBtn, { backgroundColor: navBtnColor, borderColor: navBtnColor }]}
              activeOpacity={0.85}
              onPress={this._handleSubmit}
            >
              <Text style={[styles.text, { color: 'white' }]}>确认</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pickerWrap}>

            <PickerIOS
              style={styles.pickerItem}
              onValueChange={this._handleProvinceChange}
              selectedValue={this.state.selectedProvince}
            >
              {this.state.provinces.map((province, index) => {
                return (
                  <PickerIOS.Item value={province} label={province} key={index} />
                );
              })}
            </PickerIOS>

            <PickerIOS
              style={styles.pickerItem}
              onValueChange={this._handleCityChange}
              selectedValue={this.state.selectedCity}
            >
              {this.state.citys.map((city, index) => {
                return (
                  <PickerIOS.Item value={city} label={city} key={index} />
                );
              })}
            </PickerIOS>

            <PickerIOS
              style={styles.pickerItem}
              onValueChange={this._handleAreaChange}
              selectedValue={this.state.selectedArea}
            >
              {this.state.areas.map((area, index) => {
                return (
                  <PickerIOS.Item value={area} label={area} key={index} />
                );
              })}
            </PickerIOS>

          </View>
        </View>
      </View>
    );
  }

  render() {
    const modal = (
      <Modal
        transparent={this.state.transparent}
        visible={this.state.isVisible}
        onRequestClose={this.close}
        animationType={this.props.animationType}
      >
        {this.renderPicker()}
      </Modal>
    );

    return (
      <View>
        {modal}
        <TouchableOpacity onPress={this.open}>
          {this.props.children}
        </TouchableOpacity>
      </View>
    );
  }
}
ChinaRegionWheelPicker.propTypes = {
  isVisible: PropTypes.bool,
  selectedProvince: PropTypes.string,
  selectedCity: PropTypes.string,
  selectedArea: PropTypes.string,
  navBtnColor: PropTypes.string,
  animationType: PropTypes.string,
  transparent: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

ChinaRegionWheelPicker.defaultProps = {
  isVisible: false,
  selectedProvince: '北京',
  selectedCity: '北京',
  selectedArea: '东城区',
  navBtnColor: 'blue',
  animationType: 'slide',
  transparent: true,
  onSubmit: () => {},
  onCancel: () => {},
};

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    left: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  pickerContainer: {
    flex: 1,
    marginTop: windowHeight * 3 / 5,
    backgroundColor: '#FFF'
  },
  navWrap: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ccc'
  },
  navBtn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 4
  },
  text: {
    fontSize: 18,
  },
  pickerWrap: {
    flexDirection: 'row'
  },
  pickerItem: {
    flex: 1
  }
});
