import { LOGO_SMALL_URL } from "@constants";
import { T } from "i18n";
import { IMember } from "interfaces";

const formatAge = (age: unknown): number => {
  const isNumber = typeof age === 'number';
  if (isNumber) return age;
  return Math.floor(Math.random() * 100);
};

const formatImage = (url: string, name: string) => {
  const isNumberType = typeof url === 'number';
  let formatedImage = isNumberType ? LOGO_SMALL_URL : url.replace('/assets', '');
  return buildMemberImageFromName(formatedImage);
};

const buildMemberImageFromName = (inputImage: string): string => {
  if (inputImage !== LOGO_SMALL_URL) return inputImage;
  const [ name, lastName ] = formatName(inputImage).split(' ');
  return `https://www.mediasmart.io/images/team/${name}.${lastName}.funny.jpg`;
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

export const formatMembers = (members: IMember[]): IMember[] => {
  return members.map(({image, name, age, ...rest}) => {
    const formatedImage = formatImage(image, name);
    return {
      ...rest,
      image: formatedImage,
      name: formatName(formatedImage),
      age: formatAge(age)
    }
  });
};