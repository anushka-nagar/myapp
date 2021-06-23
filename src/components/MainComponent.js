//import logo from './logo.svg';
import { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetail';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { Switch , Route , Redirect } from 'react-router-dom';


class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      dishes : DISHES,
      //selecteDish: null
    };
  }

  // onDishSelect(dishId){
  //   this.setState({selectedDish : dishId});
  //   }

  render() {
    
    const HomePage = () => {
      return(
        <Home></Home>
      );
    }

    return (
    <div>
      <Header></Header>
      <Switch>
        <Route path="/home" component= {HomePage}></Route>
        <Route exact path="/menu" component= {() => <Menu dishes={this.state.dishes}></Menu>}></Route>
        <Redirect to="/home"></Redirect>
      </Switch>
      <Footer></Footer> 
    </div>
    );
  
  }
}

export default Main;
