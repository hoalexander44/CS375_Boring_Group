import React, {Component} from 'react';
import { Link } from "react-router-dom";


class SellerHome extends Component {
  render() {
    return(
        <div>
            <h1>Seller Home</h1>
            <div>
                <Link to="/Home"> Back </Link>
            </div>

            <div>
                <Link to="/AddPost"> Add Post </Link>
            </div>

            <div>
                <h2> POSTS </h2>
                <div>
                    <Link to="/EditPost"> New Phone $100 </Link> {/* Make this the title of the post */}
                </div>

                <div>
                    <Link to="/EditPost"> Iphone 10 $100 </Link> {/* Make this the title of the post */}
                </div>

                <div>
                    <Link to="/EditPost"> Samsung Phone $100 </Link> {/* Make this the title of the post */}
                </div>
            </div>
        </div>
    );
  }
}

export default SellerHome;
