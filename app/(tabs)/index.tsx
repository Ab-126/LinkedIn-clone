import { StyleSheet, FlatList, ActivityIndicator, Text } from "react-native";
import { useState } from "react";
import PostListItem from "../../components/PostListItem";
// import posts from "../../assets/data/posts.json";
import { gql, useQuery } from "@apollo/client";

const postList = gql`
  query PostListQuery {
    postList {
      contentF
      id
      image
      profile {
        id
        image
        name
        position
      }
    }
  }
`;

const postPaginatedList = gql`
  query PostPaginatedListQuery($first: Int, $after: Int) {
    postPaginatedList(first: $first, after: $after) {
      content
      id
      image
      profile {
        id
        image
        name
        position
      }
    }
  }
`;

export default function HomeFeedScreen() {
  const [hasMore, setHasMore] = useState(true);
  const { loading, error, data, fetchMore, refetch } = useQuery(
    postPaginatedList,
    {
      variables: { first: 5 },
    }
  );

  const loadMore = async () => {
    if (!hasMore) {
      return;
    }

    const res = await fetchMore({
      variables: { after: data.postPaginatedList.length },
    });

    if (res.data.postPaginatedList.length === 0) {
      setHasMore(false);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.log(error);
    return <Text>Something went wrong</Text>;
  }

  return (
    <FlatList
      data={data.postPaginatedList}
      renderItem={({ item }) => <PostListItem post={item} />}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMore}
      refreshing={loading}
      onRefresh={refetch}
    /> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
