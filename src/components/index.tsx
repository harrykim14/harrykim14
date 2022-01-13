import React, { useState } from "react";
import styled from "styled-components";
import type { EtcLanguage, LanguageLevel, EtcLanguageType } from "../types";
import {
  languageLevelOption,
  etcLanguageOption,
  initialEnglishLevel,
  initialEtcLangLevel,
} from "../static";
import { EtcLang } from "./EtcLanguageGroup";

export const VaildationForm = () => {
  const [englishLevel, setEnglishLevel] = useState(initialEnglishLevel);
  const [etcLangLevel, setEtcLangLevel] = useState(initialEtcLangLevel);

  const spreadOption = (
    option: typeof languageLevelOption | typeof etcLanguageOption
  ) => {
    return option.map(({ label, value }, index) => (
      <option key={index} value={value}>
        {label}
      </option>
    ));
  };

  const engLevelSelectHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const level = event.currentTarget.value as LanguageLevel;
    setEnglishLevel({ ...englishLevel, level, isEnglishLevelSelected: true });
  };

  const toeicScoreChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const toeic = parseInt(event.currentTarget.value, 10);
    if (typeof toeic === "number" && toeic <= 990) {
      setEnglishLevel({ ...englishLevel, toeic });
    }
  };

  const toeflScoreChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const toefl = parseInt(event.currentTarget.value, 10);
    if (typeof toefl === "number" && toefl <= 990) {
      setEnglishLevel({ ...englishLevel, toefl });
    }
  };

  const etcLangSelectHandler = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const lang = event.currentTarget.value as EtcLanguageType;
    const langChanged = [...etcLangLevel];
    langChanged[index].lang = lang;
    setEtcLangLevel(langChanged);
  };

  const etcLevelSelectHandler = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    console.log(index);
    const level = event.currentTarget.value as LanguageLevel;
    const copiedEtcLang = [...etcLangLevel];
    copiedEtcLang[index].level = level;
    setEtcLangLevel(copiedEtcLang);
  };

  const etcLangNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const etcLangName = event.currentTarget.value;
    const copiedEtcLang = [...etcLangLevel];
    copiedEtcLang[index].etcLangName = etcLangName;
    setEtcLangLevel(copiedEtcLang);
  };

  const deleteEtcLangButtonHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const copiedEtcLang = [...etcLangLevel];
    const splicedEtcLang = copiedEtcLang.splice(index, 1);
    setEtcLangLevel(splicedEtcLang);
  };

  const addEtcLangButtonHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setEtcLangLevel(
      [...etcLangLevel].concat({
        lang: "",
        isLangSelected: true,
        level: "",
        isLevelSelected: true,
      })
    );
  };

  const submitButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { level } = englishLevel;
    if (level === "") {
      console.log("英語レベルを選択してください。");
      setEnglishLevel({ ...englishLevel, isEnglishLevelSelected: false });
      return false;
    }

    if (!isEtcLangValidated(etcLangLevel)) {
      console.log("全ての言語、又はレベルを選択してください。");
      return false;
    }
    const etcLangToJson = JSON.stringify(etcLangLevel);
    console.log(englishLevel, etcLangToJson);
  };

  const isEtcLangValidated = (etcLangArr: EtcLanguage[]) => {
    return etcLangArr.every(({ lang, level }) => lang !== "" && level !== "");
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <MainContainer>
        <h4 className="eng-title">語学力（英語）</h4>
        <EnglishGroup
          isEnglishLevelSelected={englishLevel.isEnglishLevelSelected}
        >
          <div className="vbox">
            <label htmlFor="eng-level">レベル</label>
            <select
              id="eng-level"
              value={englishLevel.level}
              onChange={engLevelSelectHandler}
            >
              {spreadOption(languageLevelOption)}
            </select>
          </div>
          <div className="vbox">
            <label htmlFor="eng-toeic">TOEIC</label>
            <input
              type="text"
              id="eng-toeic"
              value={englishLevel.toeic}
              onChange={toeicScoreChangeHandler}
            />
            <span>点</span>
          </div>
          <div className="vbox">
            <label htmlFor="eng-toefl">TOEFL</label>
            <input
              type="text"
              id="eng-toefl"
              value={englishLevel.toefl}
              onChange={toeflScoreChangeHandler}
            />
            <span>点</span>
          </div>
        </EnglishGroup>
        <h4 className="etc-title">語学力（その他言語）</h4>
        <div>
          {etcLangLevel.map((element, index) => (
            <EtcLang
              key={index}
              index={index}
              props={element}
              deleteEtcLangButtonHandler={deleteEtcLangButtonHandler}
              etcLangSelectHandler={etcLangSelectHandler}
              etcLevelSelectHandler={etcLevelSelectHandler}
              etcLangNameChangeHandler={etcLangNameChangeHandler}
            />
          ))}
          <AddEtcLangButton type="button" onClick={addEtcLangButtonHandler}>
            + 言語を追加
          </AddEtcLangButton>
          <SendButton type="button" onClick={submitButtonHandler}>
            送信
          </SendButton>
        </div>
      </MainContainer>
    </form>
  );
};

const MainContainer = styled.div`
  width: 80%;
  margin: 2rem;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-gap: 16px;
`;
const EnglishGroup = styled.div<{ isEnglishLevelSelected: boolean }>`
  display: flex;
  flex-direction: flex-start;
  & .vbox label {
    display: inline-block;
    width: 100%;
    margin-bottom: 5px;
  }
  & .vbox select {
    width: 150px;
    height: 30px;
    margin-left: 5px;
    border: ${(props) =>
      props.isEnglishLevelSelected ? `1px solid gray` : `2px solid red`};
  }
  & .vbox input {
    width: 80px;
    height: 25px;
    margin: 0px 5px;
  }
`;

const AddEtcLangButton = styled.button`
  width: 120px;
  height: 30px;
  background: transparent;
  border-radius: 5px;
  color: #337ab7;
  border: 0.5px solid #337ab7;
  margin-right: 5rem;
  font-weight: 700;
  &:hover {
    background: #337ab7;
    color: white;
  }
`;

const SendButton = styled.button`
  width: 100px;
  height: 30px;
  background: transparent;
  border-radius: 15px;
  border: 2px solid hotpink;
  color: hotpink;
  font-weight: 700;
  &:hover {
    background: hotpink;
    color: white;
  }
`;
