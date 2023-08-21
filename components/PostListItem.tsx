import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { Post } from "../types";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

type PostListItemProps = {
  post: Post;
};

export default function PostListItem({ post }: PostListItemProps) {
  return (
    <Link href={`/posts/${post.id}`} asChild>
      <Pressable style={styles.container}>
        <Link href={`users/${post.profile.id}`} asChild>
          <Pressable style={styles.header}>
            <Image
              source={{ uri: post.profile.image }}
              style={styles.userImage}
            />
            <View>
              <Text style={styles.userName}>{post.profile.name}</Text>
              <Text>{post.profile.position}</Text>
            </View>
          </Pressable>
        </Link>
        <Text style={styles.content}>{post.content}</Text>
        {post.image && (
          <Image source={{ uri: post.image }} style={styles.postImage} />
        )}
        <View style={styles.footer}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="thumbs-o-up" size={16} color={"gray"} />
            <Text style={{ marginLeft: 5, color: "gray", fontWeight: "500" }}>
              Likes
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="comments-o" size={16} color={"gray"} />
            <Text style={{ marginLeft: 5, color: "gray", fontWeight: "500" }}>
              Comments
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="share" size={16} color={"gray"} />
            <Text style={{ marginLeft: 5, color: "gray", fontWeight: "500" }}>
              Share
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: 500,
    marginBottom: 10,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  content: {
    margin: 10,
    marginTop: 0,
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
  },
  footer: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-around",
    borderTopWidth: 0.5,
    borderColor: "lightgray",
  },
});
