import React from 'react';
import { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg } from 'reactstrap';

    function RenderDishDetails({dish}){
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                <CardTitle>
                    {dish.name}
                </CardTitle>
                <CardText>
                    {dish.description}
                </CardText>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({comment}){
        return(
            <div>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, &nbsp; {new Intl.DateTimeFormat("en-US" , {
                    year : "numeric",
                    month: "short", 
                    day: "2-digit"}).format(new Date(comment.date))}</p>
            </div>
        );
    }

    const DishDetail =  ({dish}) => {
        if(dish !== undefined){
            const comments = dish.comments.map((comment) => {
                return(
                    <div className="container">
                        <div key={comment.id}> 
                            <RenderComments comment={comment}></RenderComments>
                        </div>
                    </div>
                );
            }); 
    
            return(
                <div className="Container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDishDetails dish={dish}></RenderDishDetails>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h1>Comments</h1>
                            {comments}
                        </div>
                    </div>
                </div>  
            );
        }else{
            return(
                <div></div>
            );
        }
        
    }
     

export default DishDetail;