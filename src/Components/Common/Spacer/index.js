import React from 'react';
import {View, StyleSheet} from 'react-native';

const Spacer = (props) => {
  const {size} = props;
  return <View style={[styles.spacer, {width: size, height: size}]} />;
};
const styles = StyleSheet.create({
  spacer: {},
});
Spacer.defaultProps = {
  size: 16,
};
export {Spacer};
