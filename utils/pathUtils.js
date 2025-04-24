import path from 'path';

const pathAbsolute = new URL('.', import.meta.url).pathname;
const __dirname = path.dirname(pathAbsolute).slice(1);

export default __dirname;