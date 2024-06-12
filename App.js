import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import FoodScreen from './FoodScreen';
import FoodDetail from './FoodDetail';
import NutritionDetails from './NutritionDetails';
import LikedRecipesScreen from './LikedRecipesScreen';

const Stack = createStackNavigator();

export default function App() {
  const [likedRecipes, setLikedRecipes] = useState([]);

  useEffect(() => {
    const loadLikedRecipes = async () => {
      try {
        const savedLikedRecipes = await AsyncStorage.getItem('likedRecipes');
        if (savedLikedRecipes) {
          setLikedRecipes(JSON.parse(savedLikedRecipes));
        }
      } catch (error) {
        console.error('Failed to load liked recipes', error);
      }
    };

    loadLikedRecipes();
  }, []);

  const handleToggleLike = async (recipe) => {
    setLikedRecipes((prevLikedRecipes) => {
      const isLiked = prevLikedRecipes.some((r) => r.uri === recipe.uri);
      const updatedLikedRecipes = isLiked
        ? prevLikedRecipes.filter((r) => r.uri !== recipe.uri)
        : [...prevLikedRecipes, recipe];

      AsyncStorage.setItem('likedRecipes', JSON.stringify(updatedLikedRecipes)).catch(
        (error) => {
          console.error('Failed to save liked recipes', error);
        }
      );

      return updatedLikedRecipes;
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Food" component={FoodScreen} />
        <Stack.Screen name="FoodDetail">
  {(props) => (
    <FoodDetail {...props} onToggleLike={handleToggleLike} likedRecipes={likedRecipes} />
  )}
</Stack.Screen>

        <Stack.Screen name="NutritionDetails" component={NutritionDetails} />
        <Stack.Screen name="LikedRecipes">
  {(props) => <LikedRecipesScreen {...props} likedRecipes={likedRecipes} />}
</Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}