//import logo from './logo.svg';
import { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetail';
import { DISHES } from '../shared/dishes';
import Footer from './FooterComponent';

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      dishes : DISHES,
      selecteDish: null
    };
  }

  onDishSelect(dishId){
    this.setState({selectedDish : dishId});
    }

  render() {
    return (
    <div>
      <Header></Header>
      <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}></Menu>
      <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}></DishDetail>
      <Footer></Footer> 
    </div>
    );
  
  }
}

export default Main;
