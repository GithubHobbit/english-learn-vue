import { request } from './generic.service';

export const getWord = (id) => request({ url: `word/${id}`, method: 'get' });

export const getWords = (userId) =>
  request({ url: `word/word`, method: 'get', data: userId }); //TODO здесь userId не нужен

export const createWord = (wordData, headers) =>
  request({ url: `word/word`, method: 'post', data: wordData, headers });

export const editWords = (wordData, headers) =>
  request({ url: `word/word`, method: 'put', data: wordData, headers });

export const updateRepetedWords = (wordData) =>
  request({
    url: `word/updateRepetedWords`,
    method: 'put',
    data: wordData,
  });

export const deleteWord = (id) =>
  request({ url: `word/word/${id}`, method: 'delete' });

export const getDescription = (word) =>
  request({ url: `word/description_word/${word}`, method: 'get' });

export const getWordsToRepeat = (time) =>
  request({ url: `word/get_words_to_repeat/`, method: 'post', data: time });

export const getWordsToRepeatWithSentences = (timeZone) =>
  request({ url: `word/get_words_to_repeat_with_sentences/`, method: 'get', data: timeZone });
