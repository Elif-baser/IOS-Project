import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FoodDetail = ({ route, navigation, likedRecipes, onToggleLike }) => {
  const { recipe } = route.params;
  const [nutritionData, setNutritionData] = useState(null);
  const [liked, setLiked] = useState(() => likedRecipes.some(r => r.uri === recipe.uri));

  // API anahtarları
  const APP_ID = '063938e9';
  const APP_KEY = '629ebfcd748db88d5378e0dec32f746f';
  const NUTRITION_URL = `https://api.edamam.com/api/nutrition-details?app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const response = await fetch(NUTRITION_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: recipe.label,
            ingr: recipe.ingredientLines,
          }),
        });
        const data = await response.json();
        setNutritionData(data);
      } catch (error) {
        console.error('Error fetching nutrition data:', error);
      }
    };

    fetchNutritionData();
  }, [recipe.ingredientLines, recipe.label, NUTRITION_URL]);

  const handleNutritionPress = () => {
    navigation.navigate('NutritionDetails', { nutrition: nutritionData });
  };

  const toggleLike = () => {
    setLiked(!liked);
    onToggleLike(recipe);
  };

  const handleLikedRecipesPress = () => {
    navigation.navigate('LikedRecipes', { likedRecipes });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
          <Icon name={liked ? 'heart' : 'heart-o'} size={24} color="red" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.label}>{recipe.label}</Text>
      <Text style={styles.subtitle}>Malzemeler:</Text>
      {recipe.ingredientLines.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>
          {ingredient}
        </Text>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Besin Değerlerini Gör" onPress={handleNutritionPress} color="purple" />
        <View style={styles.spacer} />
        <Button title="Beğenilen Tariflere Git" onPress={handleLikedRecipesPress} color="orange" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF5B2',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  likeButton: {
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'purple',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'purple',
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 5,
    color: 'orange',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  spacer: {
    height: 10,
  },
});

export default FoodDetail;
