import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Globe } from "./src/Globe";

export default function App() {
  const [searchValue, setSearchValue] = useState("");

  const updateSearch = (query) => {
    setSearchValue(query);
  };

  const searchQuery = () => {
    if (searchValue.length === 0) return;

    console.log(searchValue);
  };
  const fun = () => {
    console.log("Screen Pressed");
  };
  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.search}
        placeholder="Search"
        onChangeText={updateSearch}
        value={searchValue}
        onIconPress={searchQuery}
      />
      <Globe />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  search: {
    margin: 5,
  },
});
