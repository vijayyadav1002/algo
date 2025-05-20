// To find if all the elements in string are unique

const is_unique = (input: string): boolean => {
  const char_map: { [key: string]: boolean } = {};
  for (let i = 0; i < input.length; i++) {
    const value = input.charAt(i);
    if (char_map[value]) {
      return false;
    } else {
      char_map[value] = true;
    }
  }
  return true;
};

const is_unique_sol2 = (input: string): boolean => {
  let unique_string = '';
  for (let i = 0; i < input.length; i++) {
    const value = input.charAt(i);
    if (unique_string.indexOf(value) !== -1) {
      return false;
    } else {
      unique_string += value;
    }
  }
  return true;
};

export { is_unique, is_unique_sol2 };
