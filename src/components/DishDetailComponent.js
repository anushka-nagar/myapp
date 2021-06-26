import React from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg , Breadcrumb , BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import { CommentForm } from './CommentFormComponent';

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

    const DishDetail =  ({dish , comments}) => {
        if(dish !== undefined){
            const showcomments = comments.map((comment) => {
                return(
                    <div className="container">
                        <div key={comment.id}> 
                            <RenderComments comment={comment}></RenderComments>
                        </div>
                    </div>
                );
            }); 
    
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr></hr>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDishDetails dish={dish}></RenderDishDetails>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h1>Comments</h1>
                            {showcomments}
                            <CommentForm></CommentForm>
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