export const Capitalize = (text: string) => {
  const words = text.split(' ');
  return words
    .map(word => {
      return word[0].toLocaleUpperCase() + word.substring(1);
    })
    .join(' ');
};
