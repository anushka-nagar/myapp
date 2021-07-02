import React from 'react';
import { Card , CardImg , CardText , CardTitle , CardBody , CardSubtitle} from 'reactstrap';
import { Loading } from './Loading'; 
import { baseUrl } from '../shared/baseURL';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isloading, errmess}){

    if(isloading){
        return <Loading></Loading>
    }else if(errmess){
        return(
            <h4>{errmess}</h4>
        );
    }

    return(
        <FadeTransform in transformProps = {{
                           exitTransform : 'scale(0.5) translateY(-50%)'
                       }}>
            <Card>
                <CardImg src={ baseUrl + item.image } alt={item.name}></CardImg>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    { item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

function Home(props){
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isloading={props.dishesLoading} errmess={props.dishesErrMess}></RenderCard>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} isloading={props.promosLoading} errmess={props.promosErrMess}></RenderCard>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} isloading={props.leadersLoading} errmess={props.leadersErrMess}></RenderCard>
                </div>
            </div>
        </div>
    );
}

export default Home;