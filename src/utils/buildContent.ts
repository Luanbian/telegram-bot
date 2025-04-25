import fs from 'fs';
import path from 'path';

export const buildContent = (commandName: string) => {
    const contentPath = path.resolve(
        __dirname,
        `../contents/${commandName}.md`
    );
    if (!fs.existsSync(contentPath)) {
        throw new Error(`Content file not found: ${contentPath}`);
    }
    return fs.readFileSync(contentPath, 'utf-8');
};
