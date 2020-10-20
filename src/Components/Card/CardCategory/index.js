import React from 'react';
import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Width} from '../../../Constants';

const CardCategory = (props) => {
  const {title, subTitle, image, onPress} = props;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.mask}>
          {typeof title === 'string' && title.trim().length > 0 && (
            <Text style={styles.title}>{title}</Text>
          )}
          {typeof subTitle === 'string' && subTitle.trim().length > 0 && (
            <Text style={styles.subTitle}>{subTitle}</Text>
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    width: Width,
    height: 160,
  },
  mask: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0,0,0, 0.3)',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subTitle: {
    fontSize: 15,
    marginTop: 6,
    color: '#ffffff',
  },
});
export {CardCategory};
