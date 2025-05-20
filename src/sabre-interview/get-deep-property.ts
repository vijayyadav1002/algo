/**

PS-get-deep-property exercise
Instructions
Using vanilla javascript, create a function that gets the value of a property at a given path
Example:
If given the object: 
{
    person: 
    {
      name: {
        first: 'FirstName',
        middleInitial: 'I',
        lastName: 'LastName'
      }
    }
  }
And given the path: 'person.name.lastName'
The output would be: 'LastName'
Note this is just a simple example. Your function should work with any object that includes any value.
After you complete the exercise, provide any notes on your code below such as how to run your example

*/

const getDeepProperty = (data: any, key: string, defaultValue?: any) => {
  const keys = key.split('.');
  let defaultFound = false;
  for (let i = 0; i < keys.length; i++) {
    const regex = /\[(\d+)\]/;
    const match = keys[i].match(regex);
    const currentKey = keys[i].replace(regex, '');
    if (data[currentKey] === undefined) {
      defaultFound = true;
      break;
    }
    if (!match) {
      data = data[currentKey];
    } else {
      const index = match[1];
      if (data[currentKey][index] === undefined) {
        defaultFound = true;
        break;
      }
      data = data[currentKey][index];
    }
  }

  if (defaultFound) {
    return defaultValue;
  }

  return data;
};

const getDeepPropertySol2 = (data: any, key: string, defaultValue?: any) => {
  const keyParts = key.replace('[', '.').replace(']', '').split('.');
  const getDeepInto = (data: any, keyParts: string[], defaultValue?: any): any => {
    const [currentKey, ...rest] = keyParts;
    let result;
    if (data?.[currentKey] === undefined) {
      return defaultValue;
    }
    if (rest.length) {
      result = getDeepInto(data[currentKey], rest, defaultValue);
    } else {
      result = data?.[currentKey];
    }
    return result;
  };
  return getDeepInto(data, keyParts, defaultValue);
};

const getDeepPropertySol3 = (data: any, key: string, defaultValue?: any) => {
  const keys = key.split(/\.|\[|\]/).filter(Boolean);
  return keys.reduce((acc, curr) => {
    if (acc === defaultValue) {
      return defaultValue;
    }
    if (acc?.[curr] !== undefined) {
      return acc[curr];
    }
    return defaultValue;
  }, data);
};

export { getDeepProperty, getDeepPropertySol2, getDeepPropertySol3 };
