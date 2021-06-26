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
import { addComment , fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapDispatchToProps = (dispatch) => ({
  addComment : (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))}
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
  };

  render() {
    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isloading}
              dishesErrMess={this.props.dishes.errmess}
              promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}></Home>
      );
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isloading={this.props.dishes.isloading}
                    errmess={this.props.dishes.errmess}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    addComment={this.props.addComment}></DishDetail>
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
