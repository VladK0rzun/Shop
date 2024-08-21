export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";

export interface CounterState{
    data: number;
    title: string;
}

const initialSTate: CounterState ={
    data: 42,
    title: 'YAC (yet another redux counter)'
}

export function increment(amount = 1){
    return{
        type: INCREMENT_COUNTER,
        payload: amount
    }
}

export function decrement(amount = 1){
    return{
        type: DECREMENT_COUNTER,
        payload: amount
    }
}

interface CounterAction{
    type: string
    payload: number
}

export default function counterReducer(state = initialSTate, actions: CounterAction){
    switch(actions.type){
        case INCREMENT_COUNTER:
            return {
                ...state,
                data: state.data + actions.payload
            }
        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data - actions.payload
            }
        default:
            return state;
    }
}