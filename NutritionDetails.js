import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const NutritionDetails = ({ route }) => {
  const { nutrition } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/nutrition.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Besin Değerleri</Text>
      {nutrition ? (
        <View>
          <Text style={styles.text}>Kalori: {nutrition.calories.toFixed(2)} kcal</Text>
          <Text style={styles.text}>Protein: {nutrition.totalNutrients.PROCNT.quantity.toFixed(2)} g</Text>
          <Text style={styles.text}>Yağ: {nutrition.totalNutrients.FAT.quantity.toFixed(2)} g</Text>
          <Text style={styles.text}>Karbonhidrat: {nutrition.totalNutrients.CHOCDF.quantity.toFixed(2)} g</Text>
        </View>
      ) : (
        <Text style={styles.error}>Besin değerleri yüklenemedi.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5B2',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'purple',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: 'orange',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});

export default NutritionDetails;
