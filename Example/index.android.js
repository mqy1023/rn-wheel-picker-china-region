import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, AppRegistry } from 'react-native';
import ChinaRegionWheelPicker from './lib/index';

export default class ChinaRegionModalPickerTest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region1: '',
      isPickerVisible: false,
      region2: ''
    };
  }

  _onPress2Show() {
    this.setState({ isPickerVisible: true });
  }
  _onPressCancel() {
    this.setState({ isPickerVisible: false });
    console.log('cancel');
  }
  _onPressSubmit(params) {
    this.setState({ isPickerVisible: false });
    this.setState({ region2: `${params.province},${params.city},${params.area}` });
  }

  render() {
    return (
      <View style={styles.container}>
        <ChinaRegionWheelPicker
          onSubmit={(params) => this.setState({ region1: `${params.province},${params.city},${params.area}` })}
          onCancel={() => console.log('cancel')}
        >
          <Text
            style={{ backgroundColor: '#FFF', width: 200, paddingVertical: 20, textAlign: 'center', color: 'black' }}
          >{this.state.region1 || '点击去选择地区'}</Text>
        </ChinaRegionWheelPicker>


        <ChinaRegionWheelPicker
          isVisible={this.state.isPickerVisible}
          navBtnColor={'red'}
          selectedProvince={'广东'}
          selectedCity={'深圳'}
          selectedArea={'福田区'}
          transparent
          animationType={'fade'}
          onSubmit={this._onPressSubmit.bind(this)}
          onCancel={this._onPressCancel.bind(this)}
          androidPickerHeight={100}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginTop: 50, backgroundColor: 'red', padding: 10, borderRadius: 6 }}
          onPress={this._onPress2Show.bind(this)}
        >
          <Text style={{ color: 'white' }}>{this.state.region2 || '点击去选择地区' }</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1E1E1',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('AwesomeProject', () => ChinaRegionModalPickerTest);
