import { CharacterEditForm } from '../../../components/characters/CharacterEditForm';
import { API_URL } from '../../../consts';
import { loadDictionaries } from '../../../helpers/data-loader';
import { fetchWrapper } from '../../../helpers/fetch-wrapper';

export const getServerSideProps = async ({ params }) => {
    let character = null;
    let dictionaries: any = {};
    if (params.hasOwnProperty('id')) {
        character = await fetchWrapper.get(`${API_URL}/api/characters/details/${params.id}`).then(data => data.data).catch(err => { console.log(err); return null; })
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