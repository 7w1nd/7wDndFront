import { API_URL } from "../consts";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import ISystem from "../interfaces/system.interface";

export const systemRepo = {
    getAll,
};

function getAll(): Promise<ISystem[]> {
    return fetchWrapper.get(`${API_URL}/api/systems`).then((res: any) => res?.data);
}