import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseURL';

export const addComment = (comment) => {
    return(
        {
            type : ActionTypes.ADD_COMMENT,
            payload : comment
        }
    )
}; 

export const postComment = (dishId, rating, author, comment) => (dispatch) =>{
    const newComment = {
        dishId : dishId,
        rating : rating,
        author : author,
        comment : comment
    }

    newComment.date = new Date().toISOString();

    return fetch( baseUrl + 'comments', {
        method : 'POST',
        body : JSON.stringify(newComment),
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials : 'same-origin'
    }).then(Response => {
        if(Response.ok){
            return Response;
        }else{
            let err = new Error("Error : " + Response.status + " : " + Response.statusText);
            throw err;
        }
    }, Reject => {
        throw new Error(Reject.message);
    })
    .then(response => response.json())
    .then(comment => dispatch(addComment(comment)))
    .catch((error) => {
        console.log("Posting comments : " + error.message);
        alert("Your comment could not be posted. \n Error : " + error.message);
    })
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    
    return fetch(baseUrl + 'dishes')
            .then(response => {
                if(response.ok){
                    return response;
                }else{
                    let err = new Error("Error " + response.status + " : " + response.statusText);
                    err.response = response;
                    throw err;
                }
            },reject => {
                let err = new Error(reject.message);
                throw err;
            })
            .then(response => response.json())
            .then(dishes => dispatch(addDishes(dishes)))
            .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type : ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type : ActionTypes.DISHES_FAILED,
    payload : errmess
});

export const addDishes = (dishes) => ({
    type : ActionTypes.ADD_DISHES,
    payload : dishes
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
            .then(response => {
                if(response.ok){
                    return response;
                }else{
                    let err = new Error("Error " + response.status + " : " + response.statusText);
                    err.response = response;
                    throw err;
                }
            },reject => {
                let err = new Error(reject.message);
                throw err;
            })
            .then(response => response.json())
            .then(comments => dispatch(addComments(comments)))
            .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmess) => ({
    type : ActionTypes.COMMENTS_FAILED,
    payload : errmess
});

export const addComments = (comments) => ({
    type : ActionTypes.ADD_COMMENTS,
    payload : comments
})

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));
    
    return fetch(baseUrl + 'promotions')
            .then(response => {
                if(response.ok){
                    return response;
                }else{
                    let err = new Error("Error " + response.status + " : " + response.statusText);
                    err.response = response;
                    throw err;
                }
            },reject => {
                let err = new Error(reject.message);
                throw err;
            })
            .then(response => response.json())
            .then(promos => dispatch(addPromos(promos)))
            .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type : ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type : ActionTypes.PROMOS_FAILED,
    payload : errmess
});

export const addPromos = (promos) => ({
    type : ActionTypes.ADD_PROMOS,
    payload : promos
})