import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {View, StyleSheet, Image} from 'react-native';
import {Images, Width} from '../../Constants';
import {Chip, Divider, Paragraph, Title} from 'react-native-paper';
import {CardProduct} from '../../Components/Card/CardProduct';
import {Spacer} from '../../Components/Common';
import {getInformationByLanguage} from './Utils';
import {URL} from '../../Constants/Config';

const Product = (props) => {
  const product =
    props.route.params && props.route.params.product
      ? props.route.params.product
      : null;

  const similarFood = new Array(6).fill(10);
  const renderItem = () => {
    return similarFood.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <CardProduct
            name="Tuna"
            image={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQJOpMJL8ROfiCZ4Z1NwNsNItggUnwdOQtV3A&usqp=CAU',
            }}
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            price={10}
            onPress={() => {
              props.navigation.navigate('Product');
            }}
          />
          <Spacer />
        </React.Fragment>
      );
    });
  };
  const name = product ? getInformationByLanguage(product.names) : null;
  const shortDescription = product
    ? getInformationByLanguage(product.shortDescriptions)
    : null;
  const longDescriptions = product
    ? getInformationByLanguage(product.longDescriptions)
    : null;
  const currency =
    product &&
    product.price &&
    product.price.currency &&
    product.price.currency.code
      ? product.price.currency.code
      : 'QR';
  const price =
    product && product.price && product.price.value ? product.price.value : '0';
  const priceValue = `${price}${currency}`;
  const image =
    product && product.picture && product.picture.fileUrl
      ? {uri: `${URL}/${product.picture.fileUrl}`}
      : Images.defaultCategory;
  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}>
      <Image style={styles.image} source={image} />
      <View style={styles.row}>
        {name &&
        name.value &&
        typeof name.value === 'string' &&
        name.value.trim().length > 0 ? (
          <Title style={styles.title}>{name.value}</Title>
        ) : null}
        <Chip icon="cash">{priceValue}</Chip>
      </View>
      <Divider />
      <View style={styles.content}>
        {shortDescription &&
        shortDescription.value &&
        typeof shortDescription.value === 'string' &&
        shortDescription.value.trim().length > 0 ? (
          <Paragraph>{shortDescription.value}</Paragraph>
        ) : null}
        <Spacer size={16} />
        {longDescriptions &&
        longDescriptions.value &&
        typeof longDescriptions.value === 'string' &&
        longDescriptions.value.trim().length > 0 ? (
          <Paragraph>{longDescriptions.value}</Paragraph>
        ) : null}
      </View>
      <View style={styles.row}>
        <Title style={styles.title}>Similar food</Title>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        {renderItem()}
      </ScrollView>
      <Spacer size={32} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: Width,
    height: 380,
  },
  row: {
    flexDirection: 'row',
    padding: 16,
  },
  title: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  scrollView: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
});
export default Product;
