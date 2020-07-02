import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {
  AirbnbRating,
  Button,
  Card,
  Icon,
  Input,
  Overlay,
} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {postComment, postFavorite} from '../redux/ActionCreators';

function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{uri: baseUrl + dish.image}}>
        <Text style={{margin: 10}}>{dish.description}</Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
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
          <Icon
            raised
            reverse
            name="pen"
            type="font-awesome-5"
            color="#f50"
            onPress={() => props.onAddCommentButtonClicked()}
          />
        </View>
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
  const [overlayState, updateOverlayState] = useState(false);

  const [authorInputText, onAuthorInputChanged] = useState('');

  const [commentInputText, onCommentInputChanged] = useState('');

  const [rating, onRatingChanged] = useState(3);

  const [isSubmitting, onSubmitChange] = useState(false);

  useEffect(() => {
    if (props.comments.isSubmitLoading) {
      onSubmitChange(true);
    }
    if (isSubmitting && !props.comments.isSubmitLoading) {
      updateOverlayState(false);
    }
  }, [isSubmitting, props.comments.isSubmitLoading, overlayState]);

  const authorInput = React.createRef();
  const markFavorite = dishId => {
    props.postFavorite(dishId);
  };

  const addCommentButtonClicked = () => {
    updateOverlayState(true);
  };

  const onRatingValueChanged = value => {
    onRatingChanged(value);
  };

  const onSubmitButtonPressed = dishId => {
    if (!props.comments.isSubmitLoading) {
      const comment = {
        id: `${props.comments.comments.length + 1}`,
        dishId: dishId,
        rating: rating,
        author: authorInputText.trim(),
        comment: commentInputText.trim(),
        date: new Date().toISOString(),
      };
      props.postComment(comment);
    }
  };

  authorInput && authorInput.current && authorInput.current.focus();

  const {dishId} = props.route.params;
  return (
    <ScrollView>
      <RenderDish
        dish={props.dishes.dishes[+dishId]}
        favorite={props.favorites.some(el => el === dishId)}
        onPress={() => markFavorite(dishId)}
        onAddCommentButtonClicked={addCommentButtonClicked}
      />
      <RenderComments
        comments={props.comments.comments.filter(
          comment => comment.dishId === dishId,
        )}
      />
      {overlayState ? (
        <Overlay
          isVisible={overlayState}
          onBackdropPress={() => updateOverlayState(false)}
          fullScreen={true}>
          <View>
            <AirbnbRating
              defaultRating={rating}
              onFinishRating={value => onRatingValueChanged(value)}
            />
            <Input
              placeholder="Author"
              ref={authorInput}
              onChangeText={text => onCommentInputChanged(text)}
            />
            <Input
              placeholder="Add a comment"
              onChangeText={text => onAuthorInputChanged(text)}
            />
            <Button
              title="Submit"
              style={{margin: 10}}
              onPress={() => onSubmitButtonPressed(dishId)}
              loading={props.comments.isSubmitLoading}
            />
            <Button
              title="Cancel"
              type="outline"
              onPress={() => updateOverlayState(false)}
            />
          </View>
        </Overlay>
      ) : null}
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
  postComment: comment => dispatch(postComment(comment)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DishDetail);
