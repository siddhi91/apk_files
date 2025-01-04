import React from 'react';   
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFavorites } from '../context/Favoritescontext'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 

const DetailsScreen = ({ route, navigation }) => {
  const { repo } = route.params;
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some((item) => item.id === repo.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(repo.id);
    } else {
      addFavorite(repo);
    }
  };

  if (!repo) {
    return (
      <View style={styles.container}>
        <Text>No repository details available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{repo.name}</Text>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-o'}
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsBox}>
        <Text style={[styles.description, styles.spacing]}>{repo.description || 'No description available'}</Text>
        <Text style={[styles.spacing, styles.sectionText]}>⭐ Stars: {repo.stargazers_count}</Text>
        <Text style={[styles.spacing, styles.sectionText]}>🍴 Forks: {repo.forks_count}</Text>
        <Text style={[styles.spacing, styles.sectionText]}>🔧 Open Issues: {repo.open_issues_count}</Text>
        <Text style={[styles.spacing, styles.sectionText]}>📅 Created At: {new Date(repo.created_at).toLocaleDateString()}</Text>
        <Text style={[styles.spacing, styles.sectionText]}>📆 Last Updated: {new Date(repo.updated_at).toLocaleDateString()}</Text>
        <Text style={[styles.spacing, styles.sectionText]}>💻 Primary Language: {repo.language || 'Not specified'}</Text>

        <View style={styles.ownerContainer}>
          {repo.owner?.avatar_url && (
            <Image source={{ uri: repo.owner.avatar_url }} style={styles.avatar} />
          )}
          <Text style={styles.ownerText}>Owner: {repo.owner?.login || 'Unknown'}</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  detailsBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    padding: 15,
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    marginBottom: 10,
  },
  spacing: {
    marginBottom: 4,
  },
  sectionText: {
    marginBottom: 8,
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  ownerText: {
    marginLeft: 10,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonWrapper: {
    paddingHorizontal: 2,
  },
});

export default DetailsScreen;
