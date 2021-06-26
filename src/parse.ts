import { JsonData, NodeType, TObjectNode } from "./protocol";
import { getUrlParams, setUrlParam } from "./tree/util";
import Parse from "parse";
import { initializeParse, useParseQuery } from "@parse/react";
import { useEffect, useMemo, useState } from "react";
import { add, changeValue, importJson, remove } from "./action";

initializeParse(
  "https://translation.b4a.io/",
  "ZqSPDyNGkCzQYoQfxgGEUgpO4tp9Rc7z4DhJQNWI",
  "6aZHlL6cm2kX99WmKTATP7rZUCGvPmNNpFF76EqM"
);

interface TLanguage {
  code: string;
}

interface TTranslation {
  data: TObjectNode;
}

const { sessionId: initialSessionId } = getUrlParams();

type UseParseResult = {
  data?: TObjectNode;
  supportedLanguages: string[];
  onAdd?: (id: string, type: NodeType, label: string) => void;
  onChangeValue?: (id: string, language: string, value: string) => void;
  onRemove?: (id: string) => void;
  onImportJson?: (language: string, json: JsonData) => void;
};

export function useParse(): UseParseResult {
  const { results: supportedLanguages } = useParseQuery<
    Parse.Object<TLanguage>
  >(
    useMemo(() => new Parse.Query("Language"), []),
    {
      enableLocalDatastore: true,
      enableLiveQuery: false,
    }
  );

  const [sessionId, setSession] = useState(initialSessionId);
  const { results: translations } = useParseQuery<Parse.Object<TTranslation>>(
    useMemo(() => {
      const query = new Parse.Query<Parse.Object<TTranslation>>("Translation");
      return sessionId ? query.equalTo("objectId", sessionId) : query;
    }, [sessionId]),
    {
      enableLocalDatastore: true,
      enableLiveQuery: true,
    }
  );

  useEffect(() => {
    if (!sessionId) {
      const newSession = new Parse.Object<TTranslation>("Translation", {
        data: {
          id: "",
          name: "root",
          type: NodeType.OBJECT,
          children: [],
        },
      });
      newSession
        .save()
        .then((s) => {
          setSession(s.id);
          setUrlParam("sessionId", s.id);
        })
        .catch((e) => console.error(e));
    }
  }, [sessionId]);

  const object = translations?.[0];
  const data = object?.attributes.data;
  const applyModification = (newData: TObjectNode) => {
    object?.set({ data: newData });
    object?.save();
  };
  return {
    data,
    supportedLanguages:
      supportedLanguages?.map(({ attributes: { code } }) => code) || [],
    onAdd:
      data &&
      ((id: string, type: NodeType, label: string) =>
        applyModification(add(data, id, type, label))),
    onChangeValue:
      data &&
      ((id: string, language: string, value: string) =>
        applyModification(changeValue(data, id, language, value))),
    onRemove: data && ((id: string) => applyModification(remove(data, id))),
    onImportJson:
      data &&
      ((language: string, json: JsonData) =>
        applyModification(importJson(data, json, language))),
  };
}
