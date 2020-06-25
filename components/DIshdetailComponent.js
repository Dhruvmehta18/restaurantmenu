import React, {Component} from 'react';
import {Text, View, ToastAndroid} from 'react-native';
import {Card} from 'react-native-elements';
import {DISHES} from '../shared/menu';

function RenderDish(props) {
  const dish = props.dish;
  if (dish != null) {
    return (
      <Card
        featuredTitle={dish.name}
        image={require('./images/uthappizza.png')}>
        <Text style={{margin: 10}}>{dish.description}</Text>
      </Card>
    );
  } else {
    return <View />;
  }
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  static navigationOptions = {
    title: 'Dish Details',
  };
  showToastWithGravity = (text) => {
    ToastAndroid.showWithGravity(
      `${text}`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  render() {
    const {dishId} = this.props.route.params;
    console.log(dishId);
    return <RenderDish dish={this.state.dishes[+dishId]} />;
  }
}

export default DishDetail;
