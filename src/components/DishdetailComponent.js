import React, {Component} from 'react';
import { Card, CardImg , CardTitle, CardText, CardBody ,Breadcrumb ,BreadcrumbItem,Modal,Button, Col,Label, Row,ModalHeader,ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom' ;
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderDish({dish}){
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText> {dish.description} </CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments, addComment, dishId}) {
    if (comments != null)
        return(
            <div className="col-12 col-md-5 m-1">
                <ul className="list-unstyled">
                    {comments.map((comment)=>{
                            return (
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                    })}
                <CommentForm dishId={dishId} addComment={addComment} />      
                </ul>

            </div>                  
        );
    else
        return(
            <div></div>
        );
};


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            isModalOpen: false
        };       
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
            }); 
    }

    handleSubmit = (values) => {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
      }

    render() { 
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        return (
            <div >
                <Button outline
                    onClick={
                        this.toggleModal
                    }>
                    <span className="fa fa-pencil"></span>
                Submit Comment
                </Button>
                <div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader>Submit Comment</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Label md={12} htmlFor="rating" >Rating</Label>
                                        <Col md={12}>
                                            <Control.select model=".rating" id="rating" name="rating" className="form-control" >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Control.select>
                                        </Col>
                                    </Row>

                                <Row className="form-group">
                                    <Label md={12} htmlFor="author">Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors className="text-danger" model=".author" show="touched"
                                            messages={{
                                                required: 'Required ',
                                                minLength: 'Must be greater than 3 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                
                                <Row className="form-group">
                                    <Label md={12} htmlFor="comment">Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            rows="6"
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                            </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}

const DishDetail = (props)=> {
 if (props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link> </BreadcrumbItem> 
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}

                    />
                </div>
            </div>
        );
    else
        return (
            <div></div>
        );

}


export default DishDetail;