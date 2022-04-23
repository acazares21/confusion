import React from "react";
import { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger } from 'react-animation-components';

//Validators
const required = (val) => val && val.length; //value must be > 0
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

//CommentForm Class
class CommentForm extends Component {

    //State and props
    constructor(props) {

        super(props);

        this.state = {
            isCommentFormModalOpen: false
        };

        this.toggleCommentFormModal = this.toggleCommentFormModal.bind(this);
        this.handleCommentFormSubmit = this.handleCommentFormSubmit.bind(this);

    }

    //Messages about the state
    handleCommentFormSubmit(values) {
        /*console.log("Current State is: " + JSON.stringify(values)); //Message on console
        alert("Current State is: " + JSON.stringify(values)); //Message on alert*/
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
        
    }

    //Validating the comment form
    toggleCommentFormModal() {
        this.setState({
            isCommentFormModalOpen: !this.state.isCommentFormModalOpen
        });
    }

    //Render the react fragment
    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleCommentFormModal}>
                    <span className="fa fa-comments fa-lg"></span> Submit Comment
                </Button>

                {/* Applying commentFormModal */}
                <Modal isOpen={this.state.isCommentFormModalOpen} toggle={this.toggleCommentFormModal} >
                    <ModalHeader toggle={this.toggleCommentFormModal}> Submit Comment </ModalHeader>
                    <ModalBody>

                        <LocalForm onSubmit={(values) => this.handleCommentFormSubmit(values)}>

                            {/* Choosing the rating */}
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12} >Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating"
                                        className="form-control"
                                        name="rating"
                                        id="rating"
                                        validators={{
                                            required
                                        }}
                                    >
                                        <option>Please Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>
                            </Row>


                            {/* Name of user/author */}
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}> Your Name </Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            {/* Comment of the user/author */}
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>

                            </Row>

                            {/* Submit button */}
                            <Row className="form-group">
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>

                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

//Rendering Selected Dish
    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <FadeTransform in 
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle> {dish.name}</CardTitle>
                                <CardText> {dish.description} </CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>   
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    //Rendering Comments of Selected Dish
    function RenderComments({comments, postComment, dishId}){
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map(comment => {
            return (
                <Stagger in>
                    <Fade in>
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author},
                            &nbsp;
                            {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            }).format(new Date(comment.date))}
                            </p>
                        </li>
                    </Fade>
                </Stagger>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                    <CommentForm dishId={dishId} postComment={postComment}></CommentForm>
                </ul>
            </div>
        )
    }

//Showing Rendered Dish and its Comments on the page
    const DishDetail = (props) => {

        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

        const dish = props.dish
        
        if (dish == null) {
            return (<div></div>);
        }

        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/menu">Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {props.dish.name}
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.menu}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments /*dish={props.dish}*/ comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/>
            </div>
            </div>
        );
    }
export default DishDetail;