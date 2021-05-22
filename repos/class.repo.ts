import { API_URL } from "../consts";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import IClass from "../interfaces/class.interface";

export const classRepo = {
    getAll,
};

function getAll(systemId: string): Promise<IClass[]> {
    return fetchWrapper.get(`${API_URL}/api/classes/${systemId}`).then((res: any) => res?.data);
}