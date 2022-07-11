import { LOGO_SMALL_URL } from "@constants";
import { T } from "i18n";
import { IMember } from "interfaces";

const formatAge = (age: unknown): number => {
  const isNumber = typeof age === 'number';
  if (isNumber) return age;
  return Math.floor(Math.random() * 100);
}

const formatImage = (url: string) => {
  const isNumberType = typeof url === 'number';
  return isNumberType ? LOGO_SMALL_URL : url.replace('/assets', '');
};

const formatName = (imageUrl: string) => {
  if (imageUrl === LOGO_SMALL_URL) return T.DEFAULT_NAME;
  const urlArr = imageUrl.split('/');
  const nameFromUrl = urlArr[urlArr.length - 1];
  const nameArr = nameFromUrl.split('.');
  return `${capitalizeWord(nameArr[0])} ${capitalizeWord(nameArr[1])}`;
};

const capitalizeWord = (word: string): string => {
  const firstLetter = word.charAt(0).toUpperCase();
  const remain = word.slice(1);
  return firstLetter + remain;
};

export const formatMembers = async (members: IMember[]): Promise<IMember[]> => {
  const fromatedMembers: IMember[] = [];
  for (const { image, name, age, ...rest } of members){
    const formatedImage = formatImage(image);
    fromatedMembers.push({
      ...rest,
      image: formatedImage,
      name: formatName(formatedImage),
      age: formatAge(age)
    })
  }
  return fromatedMembers;
};