import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle , BreadcrumbItem, Breadcrumb} from 'reactstrap';
import {Link} from "react-router-dom";
class DishDetail extends Component{

    constructor(props){
        super(props);
    }
    
    renderDish(dish){
        if(dish!=null){
            console.log("dish", this.props.dish)

            return (
                <div className = "container">
                    <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    </div>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                


                    <Card>
                    <CardImg width = "100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(this.props.comments[0].date)))}</p>
                    </CardBody>
                </Card>
                </div>
            )
        }else{
            return(
                <div>hello</div>
            );
        }
    }


    render(){
        
        return (
            <div className = "container">
                <div className = "row">
                    {this.renderDish(this.props.dish)}
                </div>
                

            </div>

        );
    }
}

export default DishDetail;