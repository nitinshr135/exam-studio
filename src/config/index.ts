// eslint-disable-next-line no-unused-vars

export interface IConfig {
  appwrite: {
    PROJECT_ID: string;
    QUESTION_BANK_ID: string;
    QUESTION_PAPERS_ID: string;
    USER_EXAM_HISTORY: string;
  };
}

const variables: IConfig = {
  appwrite: {
    PROJECT_ID: "647cccd637b162c557f3",
    QUESTION_BANK_ID: "647ccce5b97c65e7f561",
    QUESTION_PAPERS_ID: "647cf4bf200f3913bdfc",
    USER_EXAM_HISTORY: "6480edbcf330b7e4ad83",
  },
};

const config: {
  [name: string]: IConfig;
} = {
  variables,
};

export default config["variables"];
