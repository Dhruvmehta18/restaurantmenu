import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {DISHES} from '../shared/menu';
import {COMMENTS} from '../shared/comments';

function RenderDish(props) {
  const dish = props.dish;
  if (dish != null) {
    return (
      <Card
        featuredTitle={dish.name}
        image={require('./images/uthappizza.png')}>
        <Text style={{margin: 10}}>{dish.description}</Text>
        <Icon
          raised
          reverse
          name={props.favorite ? 'heart' : 'heart-o'}
          type="font-awesome"
          color="#f50"
          onPress={() =>
            props.favorite ? console.log('Already favorite') : props.onPress()
          }
        />
      </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = item => {
    return (
      <View key={item.id} style={{margin: 10}}>
        <Text style={{fontSize: 14}}>{item.comment}</Text>
        <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
        <Text style={{fontSize: 12}}>
          {'-- ' + item.author + ', ' + item.date}{' '}
        </Text>
      </View>
    );
  };

  return (
    <Card title="Comments">
      {comments.map(comment => {
        return renderCommentItem(comment);
      })}
    </Card>
  );
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      favorites: [],
    };
  }

  static navigationOptions = {
    title: 'Dish Details',
  };

  markFavorite(dishId) {
    this.setState({favorites: this.state.favorites.concat(dishId)});
  }

  render() {
    const {dishId} = this.props.route.params;
    console.log(dishId);
    return (
      <ScrollView>
        <RenderDish
          dish={this.state.dishes[+dishId]}
          favorite={this.state.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
        />
        <RenderComments
          comments={this.state.comments.filter(
            comment => comment.dishId === dishId,
          )}
        />
      </ScrollView>
    );
  }
}

export default DishDetail;
