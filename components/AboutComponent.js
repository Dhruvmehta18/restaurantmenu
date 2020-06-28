import React from 'react';
import {ScrollView, Text} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingCompnent';

const History = ({history}) => {
  return (
    <Card title="Our History">
      {history.split('\n').map((text, index) => {
        return <Text key={index}>{text}</Text>;
      })}
    </Card>
  );
};

const About = props => {
  const history =
    'Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.\n' +
    '\n' +
    "The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.";

  if (this.props.leaders.isLoading) {
    return (
      <ScrollView>
        <History />
        <Card title="Corporate Leadership">
          <Loading />
        </Card>
      </ScrollView>
    );
  } else if (this.props.leaders.errMess) {
    return (
      <ScrollView>
        <History />
        <Card title="Corporate Leadership">
          <Text>{this.props.leaders.errMess}</Text>
        </Card>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView>
        <History history={history} />
        <Card title="Corporate Leadership">
          {props.leaders.leaders.map(leader => {
            return (
              <ListItem
                key={leader.id}
                leftAvatar={{source: {uri: baseUrl + leader.image}}}
                title={leader.name}
                subtitle={leader.description}
              />
            );
          })}
        </Card>
      </ScrollView>
    );
  }
};

const mapStateToProps = state => {
  return {
    leaders: state.leaders,
  };
};

export default connect(
  mapStateToProps,
  null,
)(About);
