import React, { createContext, useContext, useState } from 'react';

const SavedGymsContext = createContext();

export const SavedGymsProvider = ({ children }) => {
  const [savedGyms, setSavedGyms] = useState([]);

  const addGymToSaved = (gym) => {
    setSavedGyms((prevSavedGyms) => [...prevSavedGyms, gym]);
  };

  const removeGymFromSaved = (gymId) => {
    setSavedGyms((prevSavedGyms) => prevSavedGyms.filter(gym => gym.id !== gymId));
  };

  return (
    <SavedGymsContext.Provider value={{ savedGyms, addGymToSaved, removeGymFromSaved }}>
      {children}
    </SavedGymsContext.Provider>
  );
};

export const useSavedGyms = () => {
  return useContext(SavedGymsContext);
};
