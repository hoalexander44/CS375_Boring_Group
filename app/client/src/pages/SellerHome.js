import React, {Component} from 'react';
import { Link } from "react-router-dom";
import LinkBar from '../components/LinkBar'


// THIS IS THE DATA THAT SELLER HOME WILL NEED TO POPULATE THE SELLER'S POSTS
let data = [
    {
        title: "NEW PHONE",
        cost: 100,
        description: "This is my new phone wow! It is pretty wonderful. YEEEEET!",
        contact: "myEmail@gmail.com",
        favorite: true
    },

    {
        title: "IPHONE 10",
        cost: 100,
        description: "NEW IPHONE 10. Perfect condition. Email me if you are interested.",
        contact: "myEmail@gmail.com",
        favorite: true
    },

    {
        title: "SAMSUNG PHONE",
        cost: 100,
        description: "NEW ANDROID PHONE. Perfect condition. Email me if you are interested.",
        contact: "myEmail@gmail.com",
        favorite: true
    }
]


class SellerHome extends Component {
    editPostList = () => {

        let rows = [];
        for (var i = 0; i < data.length; i++) {
            rows.push(<div><Link to={{
                pathname: "/EditPost",
                state: {
                    loadedTitle: data[i].title,
                    loadedPrice: data[i].cost,
                    loadedDescription: data[i].description,
                    loadedContactInfo: data[i].contact,
                }
            }}>{data[i].title} - ${data[i].cost}</Link></div>);
        }
        return rows
    }

  render() {
      return (
          <div>
            <LinkBar />
            <h1>Seller Home</h1>

            <div>
                <h2> POSTS </h2>
                {this.editPostList()}
            </div>
        </div>
    );
  }
}

export default SellerHome;
