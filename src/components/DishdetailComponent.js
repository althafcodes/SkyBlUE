import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody} from 'reactstrap';

class DishDetail extends Component{
    renderDish(dish) {
        if (dish != null) {
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

    renderComments(a){
        if (a != null) {
            const Dishcmnts= a.comments.map((cmnt) => {
                return(
                    <li key={cmnt.id}>
                        <p>{cmnt.comment}</p>
                        <p>-- {cmnt.author},
                            &nbsp;
                            {new Intl.DateTimeFormat('ist', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'}).format(new Date(cmnt.date))}
                        </p>
                    </li>
                );
            });
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {Dishcmnts}
                    </ul>
                </div>
            );

        }
    }

    render() {
        return(
            <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>

                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
            </div>
        );
    }
}

export default DishDetail;