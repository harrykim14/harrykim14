import React from "react";
import styled from "styled-components";
import { languageLevelOption, etcLanguageOption } from "../../static";
import type { EtcLangPropsInterface } from "../../types";

export const EtcLang: React.VFC<EtcLangPropsInterface> = ({
  index,
  props,
  deleteEtcLangButtonHandler,
  etcLangSelectHandler,
  etcLevelSelectHandler,
  etcLangNameChangeHandler,
}) => {
  const spreadOption = (
    option: typeof languageLevelOption | typeof etcLanguageOption
  ) => {
    return option.map(({ label, value }, index) => (
      <option key={index} value={value}>
        {label}
      </option>
    ));
  };

  return (
    <EtcLanguageGroup>
      <div>
        <DeleteEtcLangButton
          type="button"
          onClick={(event) => deleteEtcLangButtonHandler(event, index)}
        >
          × 削除
        </DeleteEtcLangButton>
      </div>
      <div className="vbox">
        <label htmlFor="etc-lang">言語</label>
        <select
          id="etc-lang"
          value={props.lang}
          onChange={(event) => etcLangSelectHandler(event, index)}
        >
          {spreadOption(etcLanguageOption)}
        </select>
        {props.lang === "etc" ? (
          <span>
            <input
              type="text"
              defaultValue=""
              value={props.etcLangName}
              onChange={(event) => etcLangNameChangeHandler(event, index)}
            />
            語
          </span>
        ) : (
          ""
        )}
      </div>
      <div className="vbox">
        <label htmlFor="etc-level">レベル</label>
        <select
          id="etc-level"
          value={props.level}
          onChange={(event) => etcLevelSelectHandler(event, index)}
        >
          {spreadOption(languageLevelOption)}
        </select>
      </div>
    </EtcLanguageGroup>
  );
};

const EtcLanguageGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-bottom: 1rem;
  border: 1px solid lightgray;
  & > div:first-child {
    background: lightgray;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 0.5rem;
  }
  & .vbox label {
    display: inline-block;
    width: 100%;
    margin: 0 0.5rem;
  }
  & .vbox select {
    width: 200px;
    height: 30px;
    border-radius: 3px;
    margin: 5px 15px;
  }
  & .vbox input {
    width: 450px;
    height: 26.5px;
    border: 1px solid gray;
    border-radius: 3px;
    margin-right: 3px;
  }
`;

const DeleteEtcLangButton = styled.button`
  background: transparent;
  border: none;
  color: #337ab7;
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;
