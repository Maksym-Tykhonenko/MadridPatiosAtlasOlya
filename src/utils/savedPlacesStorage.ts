import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PlaceItem } from '../data/placesData';

const SAVED_PLACES_KEY = 'madrid_saved_places_v1';

export async function getSavedPlaces(): Promise<PlaceItem[]> {
  try {
    const raw = await AsyncStorage.getItem(SAVED_PLACES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PlaceItem[];
  } catch {
    return [];
  }
}

export async function savePlace(place: PlaceItem): Promise<void> {
  try {
    const existing = await getSavedPlaces();
    const alreadySaved = existing.some((item) => item.id === place.id);

    if (alreadySaved) {
      return;
    }

    const updated = [place, ...existing];
    await AsyncStorage.setItem(SAVED_PLACES_KEY, JSON.stringify(updated));
  } catch {}
}

export async function removeSavedPlace(placeId: string): Promise<void> {
  try {
    const existing = await getSavedPlaces();
    const updated = existing.filter((item) => item.id !== placeId);
    await AsyncStorage.setItem(SAVED_PLACES_KEY, JSON.stringify(updated));
  } catch {}
}

export async function isPlaceSaved(placeId: string): Promise<boolean> {
  try {
    const existing = await getSavedPlaces();
    return existing.some((item) => item.id === placeId);
  } catch {
    return false;
  }
}