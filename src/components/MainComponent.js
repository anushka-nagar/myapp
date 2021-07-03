//import logo from './logo.svg';
import { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch , Route , Redirect , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment , fetchComments, fetchDishes, fetchPromos , fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapDispatchToProps = (dispatch) => ({
  postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))},
  fetchComments : () => {dispatch(fetchComments())},
  fetchPromos : () => {dispatch(fetchPromos())},
  fetchLeaders : () => {dispatch(fetchLeaders())},
  postFeedback : (firstname , lastname , telnum , email , contactType , agree , message) => dispatch(postFeedback(firstname , lastname , telnum , email , contactType , agree , message)) 
});

const mapStateToProps = (state) => {
  return{
    dishes : state.dishes,
    comments : state.comments,
    leaders : state.leaders,
    promotions : state.promotions
  };
};

class Main extends Component {
  
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();
    this.props.fetchLeaders();
  };

  render() {
    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isloading}
              dishesErrMess={this.props.dishes.errmess}
              promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
              promosLoading={this.props.promotions.isloading}
              promosErrMess={this.props.promotions.errmess}              
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leadersLoading={this.props.leaders.isloading}
              leadersErrMess={this.props.leaders.errmess}></Home>
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    dishLoading={this.props.dishes.isloading}
                    dishErrmess={this.props.dishes.errmess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsLoading={this.props.comments.isloading}
                    commentsErrMess={this.props.comments.errmess}
                    postComment={this.props.postComment}></DishDetail>
      );
    }

    return (
    <div>
      <Header></Header>
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={500}>
          <Switch>
            <Route path="/home" component= {HomePage}></Route>
            <Route exact path="/menu" component= {() => <Menu dishes={this.props.dishes}></Menu>}></Route>
            <Route path="/menu/:dishId" component={DishWithId}></Route>
            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}></Contact>}></Route>
            <Route exact path ="/aboutus" component={() => <About leaders={this.props.leaders}></About>}></Route>
            <Redirect to="/home"></Redirect>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer></Footer> 
    </div>
    );
  
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
