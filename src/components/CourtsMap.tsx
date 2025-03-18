import React from 'react';
import MapView from 'react-native-maps';
import { Court } from '../types/Court';

type CourtsMapProps = {
  courts: Court[];
  onCourtPress: (court: Court) => void;
};

const CourtsMap = ({ courts, onCourtPress }: CourtsMapProps) => {
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};

export default CourtsMap; 