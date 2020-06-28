import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingCompnent';

function RenderItem(props) {
  const item = props.item;

  if (props.isLoading) {
    return <Loading />;
  } else if (props.errMess) {
    return (
      <View>
        <Text>{props.erreMess}</Text>
      </View>
    );
  } else {
    if (item != null) {
      return (
        <Card
          featuredTitle={item.name}
          featuredSubtitle={item.designation}
          image={{uri: baseUrl + item.image}}>
          <Text style={{margin: 10}}>{item.description}</Text>
        </Card>
      );
    } else {
      return <View />;
    }
  }
}

const Home = props => {
  return (
    <ScrollView>
      <RenderItem
        item={props.dishes.dishes.filter(dish => dish.featured)[0]}
        isLoading={props.dishes.isLoading}
        erreMess={props.dishes.erreMess}
      />
      <RenderItem
        item={props.promotions.promotions.filter(promo => promo.featured)[0]}
        isLoading={props.promotions.isLoading}
        erreMess={props.promotions.erreMess}
      />
      <RenderItem
        item={props.leaders.leaders.filter(leader => leader.featured)[0]}
        isLoading={props.leaders.isLoading}
        erreMess={props.leaders.erreMess}
      />
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Home);
