import React, { useState, useEffect } from 'react'; 
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useFavorites } from '../context/Favoritescontext'; 

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useFavorites();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!favorites || favorites.length === 0) {
      setError('No favorite repositories found.');
    } else {
      setError(null); // Reset error if there are favorites
    }
  }, [favorites]);

  if (favorites.length === 0 && !error) {
    return (
      <View style={styles.container}>
        <Text>No favorite repositories yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.repoItem}>
            <Text style={styles.repoName}>{item.name}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="View Details"
                onPress={() => navigation.navigate('Details', { repo: item })}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 2,
  },
  repoItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  repoName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    paddingLeft: 2,
    paddingRight: 2,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
});

export default FavoritesScreen;
