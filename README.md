# バリデーションフォームの実装

## 1. Viteを使ってプロジェクト生成
- `mkdir validation-form-react && cd validation-form-react`
- `npm init vite@latest . --template react-ts`
- `npm install && npm run dev`

## 2. styled-componentsの導入
- `npm install --save styled-components`
- `npm install --save @types/styled-components`

## 3. `src/components/index.tsx`のVaildationFormコンポーネント
- 大きく**英語**と**その他言語**を分けて状態を管理(`englishLevel`、`etcLangLevel`)
- それぞれのタイプ
```ts
// src/types/index.ts
export type LanguageLevel = '' | 'common' | 'business' | 'native';
export type EnglishLevel = {
  level: LanguageLevel,
  isEnglishLevelSelected: boolean
  toeic: number,
  toefl: number,
}

// selectは三つなのでユニオンタイプに
// etcの詳細は必要ではないかもしれないのでPartialプロパティに
export type EtcLanguageType = '' | 'kor' | 'chn' | 'etc'
export type EtcLanguage = {
  lang: EtcLanguageType,
  isLangSelected: boolean,
  etcLangName?: string,
  isEtcLangNameWritten?: boolean,
  level: LanguageLevel,
  isLevelSelected: boolean,
}
```