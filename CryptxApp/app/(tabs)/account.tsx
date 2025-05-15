import { useFetchProducts } from '@/query/use-fetch-data';
import React from 'react';
import { View, Text } from 'react-native';

type Product = {
  id: string;
  title: string;
};

export default function Account() {

  const { data, isLoading, error } = useFetchProducts();
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data) return <Text>No data</Text>;
  console.log(data);
  console.log('Account data:', data);

  return (
    <View>
        <Text>Account</Text>
        <View>
          <Text>Account</Text>
            {data.map((data: Product) => (
            <Text key={data.id}>{data.title}</Text>
            ))}
        </View>
    </View>
  );
}