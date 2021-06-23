//import logo from './logo.svg';
import { Component } from 'react';
import { Navbar , NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishDetail';
import { DISHES } from '../shared/dishes';

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
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Restorante con fusion</NavbarBrand>
        </div>
      </Navbar>        
      <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}></Menu>
      <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}></DishDetail>
    </div>
    );
  
  }
}

export default Main;
