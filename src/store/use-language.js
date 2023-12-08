import useSelector from "./use-selector";

/**
 * Хук для выборки данных из store при изменении языка
 * @param obj {Object}
 * @return {*}
 */
export default function useLanguage(obj) {

  const language = useSelector(state => state.lang.language);

  const langItems = {};

  for (let key of Object.keys(obj)) {
    langItems[key] = language === 'ru'
      ? obj[key].ru
      : obj[key].en
  };

  return langItems;
}
