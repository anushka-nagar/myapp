import React from 'react';
import { Card, CardBody, CardText, CardTitle, CardImg , Breadcrumb , BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import { CommentForm } from './CommentFormComponent';
import { Loading } from './Loading';
import { baseUrl } from '../shared/baseURL';

    function RenderDishDetails({dish}){
        return(
            <Card>
                <CardImg width="100%" src={ baseUrl + dish.image } alt={dish.name}></CardImg>
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

    const DishDetail =  (props) => {
        if(props.dishLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading></Loading>
                    </div>
                </div>
            );
        }else if(props.dishErrmess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errmess}</h4>
                    </div>
                </div>
            );
        }else if(props.dish !== null){
            const showcomments = props.comments.map((comment) => {
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
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr></hr>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDishDetails dish={props.dish}></RenderDishDetails>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h1>Comments</h1>
                            {showcomments}
                            <CommentForm  addComment={props.addComment} dishId={props.dish.id}></CommentForm>
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