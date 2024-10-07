import { sanitizeForFileName } from '../src/sanitizeForFilename';

describe('sanitizeForFileName', () => {
    it('should remove invalid characters from the file name: test 1', () => {
        const input = 'invalid:/file*name?.txt';
        const expectedOutput = 'invalidfilename.txt';
        expect(sanitizeForFileName(input)).toBe(expectedOutput);
    });

    it('should remove invalid characters from the file name: test 2', () => {
        const input = '* " \ / < > : | ?';
        const expectedOutput = '';
        expect(sanitizeForFileName(input)).toBe(expectedOutput);
    });

    it('should return the same file name if there are no invalid characters', () => {
        const input = 'validFileName.txt';
        const expectedOutput = 'validFileName.txt';
        expect(sanitizeForFileName(input)).toBe(expectedOutput);
    });

    it('should handle file names with only invalid characters', () => {
        const input = ':/?*<>|';
        const expectedOutput = '';
        expect(sanitizeForFileName(input)).toBe(expectedOutput);
    });

    it('should handle empty file names', () => {
        const input = '';
        const expectedOutput = '';
        expect(sanitizeForFileName(input)).toBe(expectedOutput);
    });

    it('should handle file names with spaces and invalid characters', () => {
        const input = 'invalid :/file *name?.txt';
        const expectedOutput = 'invalid file name.txt';
        expect(sanitizeForFileName(input)).toBe(expectedOutput);
    });
});