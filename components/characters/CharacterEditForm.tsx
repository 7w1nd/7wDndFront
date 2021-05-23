import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-nextjs-toast'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styled from "styled-components";
import Link from "next/link";
import Image from 'next/image';
import { Container, H2, StyledButton, StyledSelect, StyledInput, TextArea } from "../../styles/global";
import { characterRepo } from '../../repos/character.repo';

const Header = styled.div`
`;

const HeaderCharacterInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Row = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & > div {
        margin: 1rem;
    }
`;

const Cell = styled.div`
    margin: 0 auto;
    text-align: center;

    & .invalid-feedback {
        font-style: italic;
        font-size: 12pt;
        color: red;
        min-height: 12pt;
    }
`;

const Label = styled.label`
    font-style: italic;
    font-size: 16pt;
    display: block;
`;

const FormButtonContainer = styled.div`
    text-align: center;
    padding: 1rem;

    & button {

    }
`;

export const CharacterEditForm = (props) => {
    const { systemId, characterInfo, dictionaries } = props;
    const isAddMode = !characterInfo;
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .max(30)
            .required('Name is required'),
        race: Yup.string()
            .required('Race is required'),
        class: Yup.string()
            .required('Class is required'),
        playerName: Yup.string()
            .required('Player Name is required'),
        currentExp: Yup.number()
            .max(2400000)
            .min(0)
            .required('Exp is required'),
        level: Yup.number()
            .min(1).max(20)
            .required('Level is required'),
        note: Yup.string().max(300),
        alignment: Yup.string().default('N').required('Alignment is required'),
        size: Yup.string().required('Size is required'),
        sex: Yup.string().nullable(),
        age: Yup.string().min(0).max(1000).nullable(),
        growth: Yup.string().min(0).nullable(),
        weight: Yup.string().min(0).nullable(),
        hair: Yup.string().max(20).nullable(),
        eyes: Yup.string().max(20).nullable(),
    });
    const formOptions: any = { resolver: yupResolver(validationSchema) };

    if (!isAddMode) {
        const { ...defaultValues } = characterInfo;
        formOptions.defaultValues = defaultValues;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? createCharacter(data)
            : updateCharacter(characterInfo._id, data);
    }

    function createCharacter(data) {
        return characterRepo.create(systemId, [data])
            .then(async () => {
                toast.notify('Character added!', { duration: 1, type: "success" });
                await new Promise(resolve => setTimeout(resolve, 1000));
                router.push('/');
            })
            .catch(e => toast.notify(e, { duration: 10, type: "error" }));
    }

    function updateCharacter(id, data) {
        return characterRepo.update(id, data)
            .then(async resp => {
                toast.notify('Character updated!', { duration: 1, type: "success" });
                await new Promise(resolve => setTimeout(resolve, 1000));
                router.push('/');
            })
            .catch(e => toast.notify(e, { duration: 10, type: "error", closeButton: true }));
    }

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <H2> {isAddMode ? 'Add new Character' : `${characterInfo.race} ${characterInfo.class} ${characterInfo.name}`} </H2>
                <hr />
                <Header>
                    <Cell style={{ gridArea: "logo" }}><Image src="/pathfinder.png" alt="pathfinder logo" width={500} height={188} /></Cell>
                    <HeaderCharacterInfo style={{ gridArea: "header" }}>
                        <Row>
                            <Cell >
                                <Label>Character Name:</Label>
                                <StyledInput name="name" id="name" type="text" {...register('name')} />
                                <div className="invalid-feedback">{errors.name?.message}</div>
                            </Cell>


                            <Cell >
                                <Label>Race:</Label>
                                <StyledSelect name="race" id="race" type="text" {...register('race')} >
                                    <option value=""></option>
                                    {dictionaries.races.map((race, i) => <option key={i} value={race.name}>{race.name}</option>)}
                                </StyledSelect>
                                <div className="invalid-feedback">{errors.race?.message}</div>
                            </Cell>
                            <Cell >
                                <Label>Class:</Label>
                                <StyledSelect name="class" id="class" type="text" {...register('class')} >
                                    <option value=""></option>
                                    {dictionaries.classes.map((_class, i) => <option key={i} value={_class.name}>{_class.name}</option>)}
                                </StyledSelect>
                                <div className="invalid-feedback">{errors.class?.message}</div>
                            </Cell>
                            <Cell >
                                <Label>Player:</Label>
                                <StyledInput name="playerName" id="playerName" type="text" {...register('playerName')} />
                                <div className="invalid-feedback">{errors.playerName?.message}</div>
                            </Cell>
                        </Row>
                        <Row>
                            <Cell >
                                <Label>Level:</Label>
                                {isAddMode ? 0 : null}<StyledInput name="level" id="level" type={isAddMode ? "hidden" : "number"} defaultValue={isAddMode ? 1 : characterInfo.level} {...register('level')} />
                                <div className="invalid-feedback">{errors.level?.message}</div>
                            </Cell>
                            <Cell >
                                <Label>Exp:</Label>
                                {isAddMode ? 0 : null}<StyledInput name="currentExp" id="currentExp" type={isAddMode ? "hidden" : "number"} defaultValue={isAddMode ? 0 : characterInfo.currentExp} {...register('currentExp')} />
                                <div className="invalid-feedback">{errors.currentExp?.message}</div>
                            </Cell>
                            <Cell >
                                <Label>God:</Label>
                                <StyledInput name="god" id="god" type="text" {...register('god')} />
                                <div className="invalid-feedback">{errors.god?.message}</div>
                            </Cell>
                            <Cell >
                                <Label>Alignment:</Label>
                                <StyledSelect name="alignment" id="alignment" type="text" {...register('alignment')} >
                                    <option value=""></option>
                                    <option value="LN">LN</option>
                                    <option value="LN">LN</option>
                                    <option value="LE">LE</option>
                                    <option value="NG">NG</option>
                                    <option value="N">N</option>
                                    <option value="NE">NE</option>
                                    <option value="CG">CG</option>
                                    <option value="CN">CN</option>
                                    <option value="CE">CE</option>
                                </StyledSelect>
                                <div className="invalid-feedback">{errors.alignment?.message}</div>
                            </Cell>
                        </Row>
                        <Row>
                            <Cell >
                                <Label>Size:</Label>
                                <StyledSelect name="size" id="size" type="text" {...register('size')} defaultValue={isAddMode ? 0 : characterInfo.size}  >
                                    <option value=""></option>
                                    <option value="Medium">Medium</option>
                                    <option value="Small">Small</option>
                                </StyledSelect>
                                <div className="invalid-feedback">{errors.size?.message}</div>
                            </Cell>
                            <Cell >
                                <Label>Sex:</Label>
                                <StyledSelect name="sex" id="sex" type="text" {...register('sex')}  >
                                    <option value=""></option>
                                    <option value="woman">Woman</option>
                                    <option value="man">Man</option>
                                    <option value="other">Other</option>
                                </StyledSelect>
                                <div className="invalid-feedback">{errors.sex?.message}</div>
                            </Cell>
                            <Cell >
                                <Label>Age:</Label>
                                <StyledInput name="age" id="age" type="number" {...register('age')} />
                                <div className="invalid-feedback">{errors.age?.message}</div>
                            </Cell>
                            <Cell >
                                <Label>Growth:</Label>
                                <StyledInput name="growth" step="0.1" id="growth" type="number" {...register('growth')} />
                                <div className="invalid-feedback">{errors.growth?.message}</div>
                            </Cell>
                            <Cell >
                                <Label>Weight:</Label>
                                <StyledInput name="weight" step="0.1" id="weight" type="number" {...register('weight')} />
                                <div className="invalid-feedback">{errors.weight?.message}</div>
                            </Cell>
                            <Cell >
                                <Label>Hair:</Label>
                                <StyledInput name="hair" id="hair" type="text" {...register('hair')} />
                                <div className="invalid-feedback">{errors.hair?.message}</div>
                            </Cell>
                            <Cell >
                                <Label>Eyes:</Label>
                                <StyledInput name="eyes" id="eyes" type="text" {...register('eyes')} />
                                <div className="invalid-feedback">{errors.eyes?.message}</div>
                            </Cell>
                        </Row>
                        <Row style={{ width: '100%' }}>
                            <Label style={{ margin: 'auto 0' }}>Note:</Label>
                            <TextArea name="note" id="note" type="text" {...register('note')} />
                            <div className="invalid-feedback">{errors.note?.message}</div>
                        </Row>
                    </HeaderCharacterInfo>
                </Header>
                <FormButtonContainer>
                    <StyledButton type="submit" disabled={formState.isSubmitting}>
                        Save
                    </StyledButton>
                    <StyledButton onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting}>Reset</StyledButton>
                    <StyledButton type="button"><Link href="/" passHref>Cancel</Link></StyledButton>
                </FormButtonContainer>
            </form>
            <ToastContainer />
        </Container >
    );
}