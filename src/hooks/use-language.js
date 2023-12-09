import { langLib } from "../libs/lang-lib";
import useSelector from "./use-selector";

/**
 * Хук для выборки данных из store при изменении языка
 * @param str {String}
 * @return {*}
 */
export default function useLanguage(str) {

  const langObj = langLib;

  const language = useSelector(state => state.lang.language);

  const langItems = {};

  for (let key of Object.keys(langObj[str])) {
    langItems[key] = language === 'ru'
      ? langObj[str][key].ru
      : langObj[str][key].en
  };

  return langItems;
}