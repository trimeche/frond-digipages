import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {CardProduct} from '../../Components/Card/CardProduct';
import {Spacer} from '../../Components/Common';
import {Images, Width} from '../../Constants';
import {URL} from '../../Constants/Config';
import {getInformationByLanguage} from './Utils';

const WIDTH = (Width - 48) / 2;

const ProductList = (props) => {
  const products =
    props.route.params && props.route.params.products
      ? props.route.params.products
      : [];

  const renderItem = ({item, index}) => {
    const marginRight = index % 2 === 0 ? 16 : 0;
    const name = getInformationByLanguage(item.names);
    const shortDescription = getInformationByLanguage(item.shortDescriptions);
    const currency =
      item.price && item.price.currency && item.price.currency.code
        ? item.price.currency.code
        : 'QR';
    const price = item.price && item.price.value ? item.price.value : '0';
    const priceValue = `${price}${currency}`;
    const image =
      item.picture && item.picture.fileUrl
        ? {uri: `${URL}/${item.picture.fileUrl}`}
        : Images.defaultCategory;
    return (
      <CardProduct
        name={name.value}
        image={image}
        description={shortDescription.value}
        price={priceValue}
        containerStyle={{marginRight}}
        onPress={() => {
          props.navigation.navigate('Product', {product: item});
        }}
      />
    );
  };
  return (
    <FlatList
      style={styles.mainContainer}
      contentContainerStyle={styles.contentContainerStyle}
      data={products}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Spacer />}
      numColumns={2}
    />
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainerStyle: {
    padding: 16,
  },
  card: {
    width: WIDTH,
  },
  cardActions: {
    alignSelf: 'flex-end',
  },
  text: {
    color: '#757575',
  },
});
export default ProductList;
