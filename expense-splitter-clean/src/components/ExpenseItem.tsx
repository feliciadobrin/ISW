import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  description: string;
  amount: number;
};

const ExpenseItem = ({ description, amount }: Props) => {
  return (
    <View>
      <Text>{description}</Text>
      <Text>{amount} lei</Text>
    </View>
  );
};

export default ExpenseItem;
