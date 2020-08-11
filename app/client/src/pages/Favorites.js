import React, {Component} from 'react';
import { Link } from "react-router-dom";


class Favorites extends Component {
  render() {
    return(
        <div>
            <h1>Favorites Page</h1>
            <div>
                <Link to="/BuyerHome"> Back to buyer home </Link>
            </div>
            <div>
                <Link to="/Search"> Go to Search </Link>
            </div>
        </div>

    );
  }
}

export default Favorites;
