import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import userJson from "../../assets/data/user.json";
import { useLayoutEffect, useState } from "react";
import { User } from "../../types";
import ExperienceListItem from "../../components/ExperienceListIem";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query MyQuery($id: ID!) {
    profile(id: $id) {
      about
      authid
      backimage
      id
      image
      name
      position
      experience {
        companyimage
        companyname
        id
        title
        userid
      }
    }
  }
`;

export default function UserProfile() {
  // const [user, setUser] = useState<User>(userJson);
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { loading, error, data } = useQuery(query, { variables: { id } });
  const user = data?.profile;

  const onConnect = () => {
    console.warn("Connect button pressed");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: user?.name || "User",
    });
  }, [user?.name]);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    console.log(error);
    return <Text>Something went wrong</Text>;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        {/* BG Image */}
        <Image source={{ uri: user.backimage }} style={styles.backImage} />

        <View style={styles.headerContent}>
          {/* Profile Image */}
          <Image source={{ uri: user.image }} style={styles.image} />

          {/* Name and position */}
          <Text style={styles.name}>{user.name}</Text>
          <Text>{user.position}</Text>

          {/* Connect Button */}
          <Pressable onPress={onConnect} style={styles.button}>
            <Text style={styles.buttonText}>Connect</Text>
          </Pressable>
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>About</Text>
        <Text style={styles.paragraph}>{user.about}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Experience</Text>
        {user?.experience?.map((experience: any) => (
          <ExperienceListItem experience={experience} key={experience.id} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: "white",
    marginBottom: 5,
  },
  backImage: {
    width: "100%",
    aspectRatio: 5 / 2,
    marginBottom: -60,
  },
  headerContent: {
    padding: 10,
    paddingTop: 0,
  },
  image: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
  },
  name: {
    fontSize: 24,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "royalblue",
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  section: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 5,
  },
  paragraph: {
    lineHeight: 20,
  },
});
