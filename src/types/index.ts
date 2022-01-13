import React from "react";

export type LanguageLevel = '' | 'common' | 'business' | 'native';
export type EnglishLevel = {
  level: LanguageLevel,
  isEnglishLevelSelected: boolean
  toeic: number,
  toefl: number,
}

export type EtcLanguageType = '' | 'kor' | 'chn' | 'etc'
export type EtcLanguage = {
  lang: EtcLanguageType,
  isLangSelected: boolean,
  etcLangName?: string,
  isEtcLangNameWritten?: boolean,
  level: LanguageLevel,
  isLevelSelected: boolean,
}

export type EtcLangPropsInterface = {
  index: number,
  props: EtcLanguage,
  deleteEtcLangButtonHandler: (event:React.MouseEvent<HTMLButtonElement>, index: number) => void,
  etcLangSelectHandler: (event:React.ChangeEvent<HTMLSelectElement>, index: number) => void,
  etcLevelSelectHandler: (event:React.ChangeEvent<HTMLSelectElement>, index: number) => void,
  etcLangNameChangeHandler: (event:React.ChangeEvent<HTMLInputElement>, index: number) => void,
}
