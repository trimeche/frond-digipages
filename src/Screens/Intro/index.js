import {useQuery} from '@apollo/client';
import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import {Button, Text, Title} from 'react-native-paper';
import {Width, Height, Images} from '../../Constants';
import {ID_MENU, URL} from '../../Constants/Config';
import {DOCUMENT_GET_DATA} from '../../Graphql/Query';

const HEIGHT_IMAGE = Height * 0.86;
const BORDER_RADIUS = 50;

const Intro = (props) => {
  const {data} = useQuery(DOCUMENT_GET_DATA, {
    variables: {accessCode: ID_MENU},
  });
  React.useEffect(() => {
    StatusBar.setHidden(true);
  }, []);
  const onPress = () => {
    props.navigation.navigate('Home');
    StatusBar.setHidden(false);
  };
  const logo =
    data &&
    data.getAccessMenuDetails &&
    data.getAccessMenuDetails.accessMenu &&
    data.getAccessMenuDetails.accessMenu.logo
      ? {uri: `${URL}/${data.getAccessMenuDetails.accessMenu.logo}`}
      : Images.logo;
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={Images.welcome}
        style={styles.image}
        borderBottomLeftRadius={BORDER_RADIUS}
        borderBottomRightRadius={BORDER_RADIUS}>
        <View style={styles.mask}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Title style={styles.title}>Welcome</Title>
          <Text style={styles.subTitle}>
            The mission is simple: serve delicious, fresh food that 
            guests will want to return to week after week because our menu recommended a best food to you 
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.box}>
        <View style={styles.boxLeft}>
          <Text style={styles.text}>The best Recommendation For You in Our Menu</Text>
        </View>
        <Button mode="text" color="#000" onPress={onPress}>
          Next
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: Width,
    height: HEIGHT_IMAGE,
  },
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 180,
    height: 180,
  },
  title: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 24,
  },
  subTitle: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 8,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  boxLeft: {
    flex: 1,
  },
  text: {
    color: '#000',
  },
});
export default Intro;
