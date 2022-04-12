import { request } from "./generic.service";

export const getWord = (id) =>
  request({ url: `word/${id}`, method: "get" });

export const getWords = (userId) => 
  request({ url: `word`, method: "get", data: userId});

export const createWord = (wordData) =>
  request({ url: `word`, method: "post", data: wordData });

export const editWord = (wordData, id) =>
  request({ url: `word/${id}`, method: "put", data: wordData });

export const deleteWord = (id) =>
  request({ url: `word/${id}`, method: "delete" });
