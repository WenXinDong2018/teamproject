import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
class DishDetail extends Component{

    constructor(props){
        super(props);
    }
    
    renderDish(dish){
        if(dish!=null){
            console.log("dish", this.props.dish)

            return (
                <Card>
                    <CardImg width = "100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(this.props.dish.comments[0].date)))}</p>
                    </CardBody>
                </Card>
            )
        }else{
            return(
                <div></div>
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