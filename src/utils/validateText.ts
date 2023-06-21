import { blockList, allowList } from "./filterList";

const validateText = (text: string) => {
  const lowerCaseMessage = text.toLowerCase();
  const lowerCaseBlockList = blockList.map(item => item.toLowerCase());
  const lowerCaseAllowList = allowList.map(item => item.toLowerCase());

  const isBlocked = lowerCaseBlockList.some(blocked => {
    if (lowerCaseAllowList.includes(blocked)) {
      return false;
    }
    const regex = new RegExp(`\\b${blocked}\\b`, 'g');
    return regex.test(lowerCaseMessage);
  });

  return !isBlocked;
};

export default validateText;