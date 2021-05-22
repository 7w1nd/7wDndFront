import { CharacterEditForm } from '../../../components/characters/CharacterEditForm';
import { loadDictionaries } from '../../../helpers/data-loader';
import { characterRepo } from '../../../repos/character.repo';

export const getServerSideProps = async ({ params }) => {
    let character = null;
    let dictionaries: any = {};
    if (params.hasOwnProperty('id')) {
        character = await characterRepo.getById(params.id).catch(err => { console.log(err); return null; })
        dictionaries = await loadDictionaries(character['system']);
    }
    return {
        props: {
            characterInfo: character,
            systemId: character['system'],
            dictionaries
        },
    }
};

export default CharacterEditForm;