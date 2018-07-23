import { ADD_PERSON, REMOVE_PERSON } from '../actions';

const initialState = {
    persons : []
};

const personReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_PERSON: {
            const newPersons = state.persons.concat(action.payload);
            return { ...state, persons : newPersons };
        }

        case REMOVE_PERSON: {
            const newPersons = state.persons.filter(person => action.payload !== person.id);
            return { ...state, persons : newPersons };
        }

        default:
            return state;
    }
};

export default personReducer;