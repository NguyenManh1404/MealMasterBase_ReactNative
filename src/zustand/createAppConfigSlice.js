export const createAppConfigSlice = (set, get) => ({
  number: 0,
  counterNumber: newNumber => set({number: newNumber}),
});
