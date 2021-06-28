import React , { Component } from 'react';
import { Modal , ModalHeader , ModalBody , Button , Row , Col , Label} from 'reactstrap';
import { Control , LocalForm , Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxlen = (len) => (val) => !val || val.length <= len;
const minlen = (len) => (val) => val && val.length > len;

export class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            isModalOpen : false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen : !(this.state.isModalOpen)
        })
    }

    handleSubmit(val){
        this.toggleModal();
        this.props.postComment(this.props.dishId, val.rating, val.author, val.comment);
    }


    render(){
        return(
            <React.Fragment>
                <Button className="fa fa-pencil-square-o bg-white text-secondary" onClick={this.toggleModal}>&nbsp; Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" className="form-control" validators={{required, maxlen : maxlen(15), minlen : minlen(2)}}></Control.text>
                                    <Errors model=".author" className="text-danger" show="touched" messages={{required: "Required. ", maxlen: "Should be 15 characters or less. ", minlen: "Should be greater than 2 characters. "}}></Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" className="form-control" rows={6}></Control.textarea>
                                </Col>
                            </Row>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}
