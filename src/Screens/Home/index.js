import React from 'react';
import {useQuery} from '@apollo/client';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {CardCategory} from '../../Components/Card/CardCategory';
import {DOCUMENT_GET_DATA} from '../../Graphql/Query';
import {getInformationByLanguage} from './Utils';
import {ID_MENU, URL} from '../../Constants/Config';
import {Images} from '../../Constants';
import {Text} from 'react-native-paper';

const Home = (props) => {
  const {loading, error, data, refetch} = useQuery(DOCUMENT_GET_DATA, {
    variables: {accessCode: ID_MENU},
  });

  const renderItem = ({item}) => {
    const name = getInformationByLanguage(item.names);
    const description = getInformationByLanguage(item.descriptions);
    const image =
      item.picture && item.picture.fileUrl
        ? {uri: `${URL}/${item.picture.fileUrl}`}
        : Images.defaultCategory;
    return (
      <CardCategory
        title={name.value}
        subTitle={description.value}
        image={image}
        onPress={() =>
          props.navigation.navigate('ProductList', {
            title: name.value,
            products: item.products,
          })
        }
      />
    );
  };
  if (error) {
    return <Text>Error</Text>;
  }
  const categories =
    data &&
    data.getAccessMenuDetails &&
    data.getAccessMenuDetails.accessMenu &&
    data.getAccessMenuDetails.accessMenu.categories
      ? data.getAccessMenuDetails.accessMenu.categories
      : [];
  return (
    <FlatList
      refreshing={loading}
      onRefresh={() => {
        refetch({variables: {accessCode: ID_MENU}});
      }}
      style={styles.mainContainer}
      data={categories}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
    />
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
export default Home;
