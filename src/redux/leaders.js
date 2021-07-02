import * as ActionTypes from './ActionTypes';

export const Leaders = (state = { isloading : true , errmess : null , leaders : [] }, action) => {
    switch(action.type){
        case ActionTypes.ADD_LEADERS : 
            return { ...state , isloading : false , errmess : null , leaders : action.payload };
        case ActionTypes.LEADERS_LOADING : 
            return { ...state , isloading : true , errmess : null , leaders : [] };
        case ActionTypes.LEADERS_FAILED : 
            return { ...state , isloading : false , errmess : action.payload , leaders : [] };
        default:
            return state;
    }
}