import React from 'react';
import {useQuery} from '@apollo/client';
import { ScrollView } from 'react-native-gesture-handler';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Images, Width } from '../../Constants';
import { Chip, Divider, Paragraph, Title } from 'react-native-paper';
import { CardProduct } from '../../Components/Card/CardProduct';
import { Spacer } from '../../Components/Common';
import { getInformationByLanguage,getSimilarProducts } from './Utils';
import { URL,ID_MENU } from '../../Constants/Config';
import { URLA } from '../../AxiosUrl/axiosurl';
import axios from 'axios';
import { DOCUMENT_GET_DATA } from '../../Graphql/Query';

const Product = (props) => {
  const product =
    props.route.params && props.route.params.product
      ? props.route.params.product
      : null;
  const [similarProducts, setSimilarProducts] = React.useState([]);
  const {data} = useQuery(DOCUMENT_GET_DATA, {
    variables: {accessCode: ID_MENU},
  });
  React.useEffect(() => {
    const config = async () => {
      const response = await axios.get(`${URLA}/${product.id}`);
      const categories = data.getAccessMenuDetails.accessMenu.categories || [];
      const newSimilarProducts = getSimilarProducts(categories, response.data);
      setSimilarProducts(newSimilarProducts);
    };
    if (product && data) {
      config();
    }
  }, [product, data]);

  const renderItem = () => {
    return similarProducts.map((item, index) => {
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
        <React.Fragment key={index}>
          <CardProduct
            name={name.value}
            image={image}
            description={shortDescription.value}
            price={priceValue}
            onPress={() => {
              props.navigation.push('Product', {product: item});
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