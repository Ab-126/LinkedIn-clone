import { Text, View, ActivityIndicator, FlatList } from "react-native";
import users from "../assets/data/users.json";
import UserListItem from "../components/UserLIstItem";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

const query = gql`
  query profileSearch($term: String) {
    profileSearch(term: $term) {
      id
      image
      name
      positions
    }
  }
`;

export default function SearchScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  const { data, loading, error } = useQuery(query, {
    variables: { term: `%${search}%` },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search users",
        onChangeText: (event) => setSearch(event.nativeEvent.text),
        // onBlur: () => {
        //   handleSearch();
        // },
      },
    });
  }, [navigation]);

  if (loading && !data?.profileSearch) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Something went wrong...</Text>;
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        contentContainerStyle={{ marginTop: 150 }}
        data={data?.profileSearch}
        renderItem={({ item }) => <UserListItem user={item} />}
      />
    </View>
  );
}
