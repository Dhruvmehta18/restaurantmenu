import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {Text, Tile} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingCompnent';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Menu',
  };

  render() {
    const {navigate} = this.props.navigation;
    const renderMenuItem = ({item, index}) => {
      return (
        <Tile
          key={index}
          title={item.name}
          caption={item.description}
          featured
          onPress={() => navigate('Dishdetail', {dishId: item.id})}
          imageSrc={{uri: baseUrl + item.image}}
        />
      );
    };
    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{this.props.dishes.errMess}</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.props.dishes.dishes}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
  };
};

export default connect(mapStateToProps)(Menu);
