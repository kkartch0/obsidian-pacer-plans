/**
 * Removes any characters that are invalid in the context of a file name.
 * @param fileName - The original file name.
 * @returns The sanitized file name.
 */
export function sanitizeForFileName(fileName: string): string {
    // Regular expression to match invalid file name characters
    const invalidChars = /[\/:*?"<>|]/g;
    // Replace invalid characters with an empty string
    return fileName.replace(invalidChars, '').trim();
}