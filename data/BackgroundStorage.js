import AsyncStorage from "@react-native-async-storage/async-storage";

export const getOwnedBackgrounds = async () => {
  const backgrounds = await AsyncStorage.getItem("ownedBackgrounds");
  return backgrounds ? JSON.parse(backgrounds) : [];
};

export const addOwnedBackground = async (background) => {
  let owned = await getOwnedBackgrounds();
  if (!owned.includes(background)) {
    owned.push(background);
    await AsyncStorage.setItem("ownedBackgrounds", JSON.stringify(owned));
  }
};

export const setSelectedBackground = async (background) => {
  await AsyncStorage.setItem("selectedBackground", background);
};

export const getSelectedBackground = async () => {
  return await AsyncStorage.getItem("selectedBackground");
};
