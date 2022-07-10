import { EN } from './en';

export enum LANG {
    EN
}

export type TextKey = keyof typeof EN;
export type TextMap = typeof EN & { [key: string]: string };

// MOCKING LOCALE
const DEFAULT_LANG = EN;

const text = (name?: LANG) => {
    let language = DEFAULT_LANG as TextMap;
    if (name === LANG.EN) language = EN as TextMap;
    return language;
};

export default text;
export const T = text();




