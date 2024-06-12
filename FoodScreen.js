import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { TextInput } from 'react-native';

const FoodScreen = ({ navigation }) => {
  const [foodData, setFoodData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        // Kullanıcı tarafından girilen arama terimini URL'ye ekliyoruz
        const response = await fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=ffa5d4c8&app_key=ac37faa5c93c71dacc948fd6bd379f34`);
        const data = await response.json();
        setFoodData(data.hits);
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    // Arama terimi değiştikçe yeniden veri çekme işlemini gerçekleştiriyoruz
    if (searchTerm.trim() !== '') {
      fetchFoodData();
    }
  }, [searchTerm]);

  const handleFoodDetail = (recipe) => {
    // Yemek detayı sayfasına yönlendirme işlemi
    navigation.navigate('FoodDetail', { recipe });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF5B2' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20, color: 'purple' }}>Yemekler</Text>
        <TextInput
          placeholder="Yemek ara..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={{ fontSize: 18, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, width: '90%' }}
        />
      </View>
      <ScrollView style={{ paddingHorizontal: 10 }}>
        {foodData.map((food) => (
          <View key={food.recipe.uri} style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 18, color: 'purple' }}>{food.recipe.label}</Text>
            <Button title="Detay" onPress={() => handleFoodDetail(food.recipe)} color="purple" style={{ width: '50%' }} />

          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FoodScreen;