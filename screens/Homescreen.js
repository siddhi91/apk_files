import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';  
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/AntDesign'; 

const HomeScreen = ({ navigation }) => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setRepositories([]);
    setPage(1);
    setHasMore(true);
    await fetchRepositories(newQuery, 1);
  };

  const fetchRepositories = async (searchQuery, pageNum) => {
    setLoading(true);
    setError(null);

    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      setError('No internet connection. Please check your network settings.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${searchQuery}&page=${pageNum}&per_page=20`);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setRepositories((prevRepos) => [...prevRepos, ...data.items]);
        setHasMore(data.items.length > 0);
      } else {
        setHasMore(false);
        setError('No repositories found for this search.');
      }
    } catch (error) {
      console.error('Error fetching repositories:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchRepositories(query, nextPage);
    }
  };

  const handlePress = (repo) => {
    navigation.navigate('Details', { repo });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>GitHub Explorer</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={styles.favoritesIcon}>
          <Icon name="heart" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <ActivityIndicator size="large" color="#1E90FF" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : repositories.length === 0 ? (
        <Text style={styles.noReposText}>No repositories found.</Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={repositories}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)} style={styles.repoItem}>
              <Text style={styles.repoName}>{item.name}</Text>
              <Text style={styles.repoDescription}>{item.description || 'No description available'}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && <ActivityIndicator size="large" color="#1E90FF" />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  favoritesIcon: {
    paddingRight: 10,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
    fontSize: 16,
  },
  noReposText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  repoItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  repoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  repoDescription: {
    fontSize: 14,
    marginTop: 5,
    color: '#555',
  },
});

export default HomeScreen;
