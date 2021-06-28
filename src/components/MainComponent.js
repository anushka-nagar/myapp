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
import { postComment , fetchComments, fetchDishes, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapDispatchToProps = (dispatch) => ({
  postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))},
  fetchComments : () => {dispatch(fetchComments())},
  fetchPromos : () => {dispatch(fetchPromos())}
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
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();
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
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}></Home>
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
      <Switch>
        <Route path="/home" component= {HomePage}></Route>
        <Route exact path="/menu" component= {() => <Menu dishes={this.props.dishes}></Menu>}></Route>
        <Route path="/menu/:dishId" component={DishWithId}></Route>
        <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}></Contact>}></Route>
        <Route exact path ="/aboutus" component={() => <About leaders={this.props.leaders}></About>}></Route>
        <Redirect to="/home"></Redirect>
      </Switch>
      <Footer></Footer> 
    </div>
    );
  
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
