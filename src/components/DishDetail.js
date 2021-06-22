import React from 'react';
import { Component } from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const dish = this.props.dish;
        const comments = dish.comments.map((comment) => {
            return(
                <div key={comment.id}> 
                    <p>{comment.comment}</p>
                    <p>{comment.author} {comment.date}</p>
                </div>
            );
        }); 

        return(
            <div className="Container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
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
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h1>Comments</h1>
                        {comments}
                    </div>
                </div>
            </div>  
        );
    }
}

export default DishDetail;