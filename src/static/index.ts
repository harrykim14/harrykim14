import type { EnglishLevel, EtcLanguage } from '../types';

export const languageLevelOption = [
    { label: 'レベルを選択', value: '' },
    { label: '日常会話レベル', value: 'common' },
    { label: 'ビジネスレベル', value: 'business' },
    { label: 'ネイティブレベル', value: 'native' },
]

export const etcLanguageOption = [
    {label: '言語を選択', value: ''},
    {label: '中国語', value: 'chn'},
    {label: '韓国語', value: 'kor'},
    {label: 'その他', value: 'etc'},
]
export const initialEnglishLevel: EnglishLevel = {
    level: '',
    isEnglishLevelSelected: true,
    toeic: 0,
    toefl: 0,
};

export const initialEtcLangLevel: EtcLanguage[] = [{
    lang: '',
    isLangSelected: true,
    level: '',
    isLevelSelected: true,
}]