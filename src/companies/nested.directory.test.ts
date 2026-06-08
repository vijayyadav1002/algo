import { toggleFolder, sampleFiles } from '@/companies/nested.directory';

const fresh = () => JSON.parse(JSON.stringify(sampleFiles));

describe('nested.directory - ToggleFolder', () => {
  test('toggles a top-level folder from open to closed', () => {
    const files = fresh();
    const result = toggleFolder(['src'], files);
    expect(result[0].isOpen).toBe(false);
  });

  test('toggles a nested folder from closed to open', () => {
    const files = fresh();
    const result = toggleFolder(['src', 'companies'], files);
    expect(result[0].files?.[0].isOpen).toBe(true);
  });

  test('toggling twice returns to original state', () => {
    const files = fresh();
    toggleFolder(['src'], files);
    toggleFolder(['src'], files);
    expect(files[0].isOpen).toBe(true);
  });

  test('does not toggle a leaf file (no isOpen property)', () => {
    const files = fresh();
    const result = toggleFolder(['src', 'companies', 'nested.directory.ts'], files);
    expect(result[0].files?.[0].files?.[0].isOpen).toBeUndefined();
  });

  test('returns files unchanged when top-level name is not found', () => {
    const files = fresh();
    const before = JSON.stringify(files);
    toggleFolder(['nonexistent'], files);
    expect(JSON.stringify(files)).toBe(before);
  });

  test('returns files unchanged when intermediate path segment is not found', () => {
    const files = fresh();
    const before = JSON.stringify(files);
    toggleFolder(['src', 'nonexistent', 'nested.directory.ts'], files);
    expect(JSON.stringify(files)).toBe(before);
  });

  test('returns files unchanged for an empty path', () => {
    const files = fresh();
    const before = JSON.stringify(files);
    toggleFolder([], files);
    expect(JSON.stringify(files)).toBe(before);
  });

  test('toggle companies', () => {
    const result = toggleFolder('src/companies'.split('/'), fresh());
    expect(result?.[0].files?.[0].isOpen).toBe(true);
  });

  test('toggle nested.directory.ts should be undefined', () => {
    const result = toggleFolder('src/companies/nested.directory.ts'.split('/'), fresh());
    expect(result?.[0].files?.[0].files?.[0]?.isOpen).toBe(undefined);
  });
});
