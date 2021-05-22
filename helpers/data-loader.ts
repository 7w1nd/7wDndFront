import { raceRepo } from '../repos/race.repo';
import { classRepo } from '../repos/class.repo';
import IRace from '../interfaces/race.interface';
import IClass from '../interfaces/class.interface';

/**
 * Load dnd system dictionaries
 */
export const loadDictionaries = async (systemId): Promise<{ races: IRace[], classes: IClass[] }> => {
    const races = await raceRepo.getAll(systemId);
    const classes = await classRepo.getAll(systemId);
    return { races, classes };
};