export const getInformationByLanguage = (information = [], language = 'EN') => {
  const value = information.find((item) => item.languageCode === language);
  if (value) {
    return value;
  }
  return null;
};
