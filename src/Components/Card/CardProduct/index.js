import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Chip, Paragraph, Title} from 'react-native-paper';
import {Width} from '../../../Constants';

const WIDTH = (Width - 48) / 2;

const CardProduct = (props) => {
  const {name, image, description, price, containerStyle, onPress} = props;

  return (
    <Card style={[styles.card, containerStyle]} onPress={onPress}>
      <Card.Cover source={image} />
      <Card.Content>
        <Title numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Title>
        <Paragraph style={styles.text} numberOfLines={2} ellipsizeMode="tail">
          {description}
        </Paragraph>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Chip icon="cash">{price}DT</Chip>
      </Card.Actions>
    </Card>
  );
};
const styles = StyleSheet.create({
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
export {CardProduct};
