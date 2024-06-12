import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const LikedRecipesScreen = ({ navigation, route }) => {
  const { likedRecipes } = route.params;

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FoodDetail', { recipe: item })}>
      <View style={styles.recipeItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.label}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beğenilen Tarifler</Text>
      <FlatList
        data={likedRecipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.uri}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5B2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 20,
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  label: {
    fontSize: 18,
    color: 'orange',
  },
});

export default LikedRecipesScreen;
