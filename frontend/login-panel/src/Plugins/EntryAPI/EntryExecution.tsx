import { createJsonAndId, createJson, getJsonById, modifyJson } from 'Plugins/JsonAPI/JsonExecution';

export interface Entry {
    id: number;
    nodeId: number;
    name: string;
}

export function EntryToJsonString(entry: Entry): string {
    return JSON.stringify(entry);
}

export function jsonStringToEntry(jsonString: string): Entry | null {
    const parsedObject = JSON.parse(jsonString); {
        return parsedObject as Entry;
    }
}

export const createNewEntryAndId = async (): Promise<number> => {
    return createJsonAndId();
}

export const createEntry = async (id: number, newEntry: Entry): Promise<void> => {
    const jsonString = EntryToJsonString(newEntry);
    await createJson(id, jsonString);

}

export const getEntryById = async (id: number): Promise<Entry | null> => {
    const result = await getJsonById(id);
    if (result) {
        return jsonStringToEntry(result);
    }
    return null;
};

export const modifyEntry = async (id: number, newEntry: Entry): Promise<void> => {
    const jsonString = EntryToJsonString(newEntry);
    await modifyJson(id, jsonString);
}
