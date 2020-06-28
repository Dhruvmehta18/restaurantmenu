import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {postFavorite} from '../redux/ActionCreators';

function RenderDish(props) {
  const dish = props.dish;
  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{uri: baseUrl + dish.image}}>
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

const DishDetail = props => {
  const markFavorite = dishId => {
    props.postFavorite(dishId);
  };

  const {dishId} = props.route.params;
  console.log(dishId);
  return (
    <ScrollView>
      <RenderDish
        dish={props.dishes.dishes[+dishId]}
        favorite={props.favorites.some(el => el === dishId)}
        onPress={() => markFavorite(dishId)}
      />
      <RenderComments
        comments={props.comments.comments.filter(
          comment => comment.dishId === dishId,
        )}
      />
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DishDetail);
