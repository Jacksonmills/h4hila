import { filterList } from "./filterList";

const validateText = (text: string) => {
  const lowerCaseMessage = text.toLowerCase();
  const lowerCaseFilterList = filterList.map(item => item.toLowerCase());

  const isBlocked = lowerCaseFilterList.some(blocked => {
    const regex = new RegExp(`\\b${blocked}\\b`, 'g');
    return regex.test(lowerCaseMessage);
  });

  return !isBlocked;
};

export default validateText;