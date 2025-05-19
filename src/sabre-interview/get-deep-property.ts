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

export { getDeepProperty };
