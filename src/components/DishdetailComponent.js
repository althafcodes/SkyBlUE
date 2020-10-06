import React from 'react';
import { Card, CardImg , CardTitle, CardText, CardBody} from 'reactstrap';


function RenderDish({dish}){
    return (
            <Card key={dish.id}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText> {dish.description} </CardText>
                </CardBody>
            </Card>
    );
}

function RenderComments({comments}) {
    return(
        <ul>
            {comments.map((comment)=>{
                    return (
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </li>
                    );
                    })}                
        </ul>                  
    );  
};

const DishDetail = (props)=> {
 if (props.dish != null){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 col-sm-12 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-md-5 col-sm-12 m-1">
                        <RenderComments comments={props.dish.comments} />
                    </div>
                </div>
            </div>
        );
    }else {
        return (
            <div></div>
        );
    }

}

export default DishDetail;