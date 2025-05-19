type DirectoryFile = {
  name: string;
  isOpen?: boolean;
  files?: DirectoryFile[];
};

export const sampleFiles: DirectoryFile[] = [
  {
    name: 'src',
    isOpen: true,
    files: [
      {
        name: 'companies',
        isOpen: false,
        files: [
          {
            name: 'nested.directory.ts',
          },
          {
            name: 'nested.directory.test.ts',
          },
        ],
      },
    ],
  },
];

export const toggleFolder = (parts: string[], files: DirectoryFile[]) => {
  const [currentName, ...rest] = parts;
  const file = files.find((value: DirectoryFile) => value.name == currentName);
  if (rest.length > 0 && file?.files) {
    file.files = toggleFolder(rest, file.files);
  } else if (file && file.isOpen !== undefined) {
    file.isOpen = !file.isOpen;
  }
  return files;
};
