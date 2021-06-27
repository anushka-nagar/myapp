import * as ActionTypes from './ActionTypes'

export const Promotions = (state = {isloading : true, errmess : null, promotions : []}, action) => {
    switch(action.type){
        case ActionTypes.ADD_PROMOS:
            return { ...state , isloading : false , errmess : null , promotions : action.payload};

        case ActionTypes.PROMOS_LOADING:
            return { ...state , isloading : true , errmess : null , promotions : []};

        case ActionTypes.PROMOS_FAILED:
            return { ...state , isloading : false , errmess : action.payload , promotions : []};

        default:
            return state;
    }
}