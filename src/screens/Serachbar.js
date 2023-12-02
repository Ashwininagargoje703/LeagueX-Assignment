import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install the package if you haven't

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.searchBarContainer}>
      <Ionicons
        name="search"
        size={24}
        color="rgba(255, 255, 255, 0.5)" // White color with 50% opacity
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 25,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginTop: 80,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)", // White color with 50% opacity
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "white", // Text color
  },
  searchIcon: {
    marginRight: 10,
  },
});

export default SearchBar;
