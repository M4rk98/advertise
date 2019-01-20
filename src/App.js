import React, { Component } from 'react';
import './App.css';
import 'tachyons';

import Card from './components/card/card';
import Table from './components/table/table';
import AffiliateForm from './components/forms/affiliateForm';
import AuthenticationForm from './components/forms/authenticationForm';
import Nav from './components/navigation/navigation';


class App extends Component {
    constructor() {
        super();

        this.state = {
            isLoggedIn: false,
            data: []

        }
    }

    componentDidMount() {
        const id = localStorage.getItem('id');
        if(id != null) {
            this.refreshAffiliates();
        }
    }


  changeLoggedIn = () => {
        if(this.state.isLoggedIn) {
            this.setState({isLoggedIn: false});
            // TODO: DELETE ID - KEY FROM BACKEND FILE
        } else {
            this.setState({isLoggedIn: true});

        }
  };

  refreshAffiliates = () => {
      fetch("https://gentle-beyond-76280.herokuapp.com/affiliates/", {
          headers: {
              id: localStorage.getItem('id'),
          }
      })
      .then((resp) => resp.json())
      .then((resp) => {
          if(resp.failed != null) {
              this.setState({isLoggedIn: false});
          } else {
              this.setState({data: resp});
              this.setState({isLoggedIn: true})
          }
      })
  };

  render() {
    return (
      <div className="App h-100">
        <div className="cf h-100">
            <Nav isLoggedIn={this.state.isLoggedIn} methods={{changeLoggedIn: this.changeLoggedIn}}/>
            <div className="fl h-100 w-100 w-100-ns pa2">
                {(!this.state.isLoggedIn) ?
                        <div>
                            <Card ChildElement={AuthenticationForm} methods={{changeLoggedIn: this.changeLoggedIn, refreshAffiliates: this.refreshAffiliates}} ></Card>
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
