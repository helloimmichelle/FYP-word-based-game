import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCoins = async () => {
  const coins = await AsyncStorage.getItem("coins");
  return coins ? parseInt(coins) : 0;
};

export const updateCoins = async (amount) => {
  let coins = await getCoins();
  coins += amount;
  await AsyncStorage.setItem("coins", coins.toString());
};
