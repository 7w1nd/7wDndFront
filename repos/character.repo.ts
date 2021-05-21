import { API_URL } from "../consts";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import ICharacter from "../interfaces/character.interface";

export const characterRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll(): Promise<ICharacter[]> {
    return fetchWrapper.get(`${API_URL}/api/characters`).then((res: any) => res?.data);
}

function getById(id): Promise<ICharacter> {
    return fetchWrapper.get(`${API_URL}/api/characters/${id}`).then((res: any) => res?.data);
}

function create(systemId: string, characters: ICharacter[]) {
    return fetchWrapper.post(`${API_URL}/api/characters/${systemId}`, characters);
}

function update(characterId: string, character: ICharacter) {
    return fetchWrapper.put(`${API_URL}/api/characters/${characterId}`, character);
}

function _delete(id) {
    return fetchWrapper.delete(`${API_URL}/api/characters/${id}`);
}