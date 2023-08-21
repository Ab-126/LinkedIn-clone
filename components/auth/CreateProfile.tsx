import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { gql, useMutation } from "@apollo/client";
import { useUserContext } from "../../context/UserContext";

const CreateProfileMutation = gql`
  mutation CreateProfile(
    $name: String
    $authid: String
    $about: String
    $image: String
    $backimage: String
  ) {
    insertProfile(
      authid: $authid
      about: $about
      image: $image
      name: $name
      backimage: $backimage
    ) {
      id
      name
      authid
      about
      image
      backimage
    }
  }
`;

const CreateProfile = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const { authUser, reloadDbUser } = useUserContext();

  const [handleMutation, { loading }] = useMutation(CreateProfileMutation);

  const onSave = async () => {
    try {
      await handleMutation({
        variables: {
          name: name,
          about: about,
          authid: authUser.id,
        },
      });
      reloadDbUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Setup Profile</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="About"
        multiline
        numberOfLines={3}
        value={about}
        onChangeText={setAbout}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={onSave}>
        <Text style={styles.buttonText}>{loading ? "Saving..." : "Save"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
    marginVertical: 5,
  },
  button: {
    backgroundColor: "royalblue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});

export default CreateProfile;
