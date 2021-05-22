import { API_URL } from "../consts";
import { fetchWrapper } from "../helpers/fetch-wrapper";
import IRace from "../interfaces/race.interface";

export const raceRepo = {
    getAll,
};

function getAll(systemId: string): Promise<IRace[]> {
    return fetchWrapper.get(`${API_URL}/api/races/${systemId}`).then((res: any) => res?.data);
}