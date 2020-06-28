import React from 'react';
import {ScrollView, Text} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import {LEADERS} from '../shared/leaders';

const History = ({history}) => {
  return (
    <Card title="Our History">
      {history.split('\n').map((text, index) => {
        return <Text key={index}>{text}</Text>;
      })}
    </Card>
  );
};

const About = () => {
  const history =
    'Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.\n' +
    '\n' +
    "The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.";
  return (
    <ScrollView>
      <History history={history} />
      <Card title="Corporate Leadership">
        {LEADERS.map(leader => {
          return (
            <ListItem
              key={leader.id}
              leftAvatar={{source: require('./images/alberto.png')}}
              title={leader.name}
              subtitle={leader.description}
            />
          );
        })}
      </Card>
    </ScrollView>
  );
};

export default About;