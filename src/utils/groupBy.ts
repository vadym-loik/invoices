import { EntryType } from "./rows";

export function groupBy(array: EntryType[], key: keyof EntryType) {
  return array.reduce((result, obj) => {
    const keyValue = obj[key]; // keyvalue - номер досьє, key - N dossier
    result[keyValue] = result[keyValue] || []; // result - {"01": [...сюди...], "02": []}
    result[keyValue].push(obj);
    return result;
  }, {} as Record<string, EntryType[]>);
}

/*
result = {
  "01": [groupofelements],
  "02": [groupofelements],
  "03": [groupofelements]...
}
**/
