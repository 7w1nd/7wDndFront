import { CharacterEditForm } from '../../../components/characters/CharacterEditForm';
import { loadDictionaries } from '../../../helpers/data-loader';

export default CharacterEditForm;

export const getServerSideProps = async ({ params }) => {
    let dictionaries = {};
    if (params['id'])
        dictionaries = await loadDictionaries(params['id']);
    return {
        props: {
            systemId: params['id'],
            dictionaries
        },
    }
}