import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Search icon from Feather icon set

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false); // Track focus state for border color change

  const handleChange = (text) => {
    setQuery(text);
  };

  const handleSubmit = () => {
    onSearch(query);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
        <Icon
          name="search"
          size={20}
          color="#ccc"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={handleChange}
          placeholder="Search for repositories"
          onSubmitEditing={handleSubmit}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputContainerFocused: {
    borderColor: '#1E90FF', // Change border color to blue when focused
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    fontSize: 15,
    flex: 1,
    paddingVertical: 4,
    color: '#333',
  },
});

export default SearchBar;
