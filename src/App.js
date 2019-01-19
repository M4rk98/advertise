import React, { Component } from 'react';
import './App.css';
import 'tachyons';

import Card from './components/card/card';
import Table from './components/table/table';
import AffiliateForm from './components/forms/affiliateForm';
import AuthenticationForm from './components/forms/authenticationForm';


class App extends Component {
    constructor() {
        super();

        this.state = {
            isLoggedIn: false,
            data: []

        }
    }


  changeLoggedIn = () => {
        if(this.state.isLoggedIn) {
            this.setState({isLoggedIn: false});

        } else {
            this.setState({isLoggedIn: true});
            this.refreshAffiliates();
            console.log(this.state.data);
        }
  };


  refreshAffiliates = () => {
      fetch("http://localhost:3000/affiliates/", {
          headers: {
              id: localStorage.getItem('id'),
          }
      })
          .then((resp) => resp.json())
          .then((resp) => {
              console.log(resp);
              this.setState({data: resp});
          }).catch((error) => {
            this.setState({isLoggedIn: false});
      })
  };

  render() {
    return (
      <div className="App h-100">
        <div className="cf h-100">
            <div className="fl h-100 w-100 w-100-ns pa2">
                {(!this.state.isLoggedIn) ?
                        <div>
                            <Card ChildElement={AuthenticationForm} methods={{changeLoggedIn: this.changeLoggedIn}} ></Card>
                        </div>
                    :
                    (
                        <div>
                            <Card ChildElement={Table} data={this.state.data} methods={{refreshAffiliates: this.refreshAffiliates}} />
                            <Card ChildElement={AffiliateForm} data="" methods={{refreshAffiliates: this.refreshAffiliates}} />

                        </div>
                    )
                }
            </div>
        </div>
      </div>
    );
  }
}

export default App;
