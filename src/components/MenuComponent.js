import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle , Breadcrumb , BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './Loading';
import { baseUrl } from '../shared/baseURL';

function RenderMenuItems({dish}){
    return(
        <Card>
            <Link to={`/menu/${dish.id}`}>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}></CardImg>
                <CardImgOverlay body className="ml-5">
                <CardTitle heading>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

    const Menu = (props) => {
        const menu = props.dishes.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <RenderMenuItems dish={dish}></RenderMenuItems>
                </div>
            );
        });

        if(props.dishes.isloading){
            return(
                <div className="col-12">
                    <div className="row">
                        <Loading></Loading>
                    </div>
                </div>
            );
        }else if(props.dishes.errmess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.dishes.errmess}</h4>
                    </div>
                </div>
            );
        }

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr></hr>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }

export default Menu;