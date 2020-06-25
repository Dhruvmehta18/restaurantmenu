import React from 'react';
import {Text} from 'react-native';
import {Card} from 'react-native-elements';

const ContactUs = () => {
  const address =
    '121, Clear Water Bay Road\nClear Water Bay, Kowloon\nHONG KONG\nTel: +852 1234 5678\nFax: +852 8765 4321\nEmail:confusion@food.net';
  return (
    <Card title="Contact Us">
      {address.split('\n').map((text, index) => {
        return <Text key={index}>{text}</Text>;
      })}
    </Card>
  );
};

export default ContactUs;
