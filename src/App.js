import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

/*
  -CamperTable
    -CamperRow
*/

class CamperRow extends Component {

  componentWillMount(){
    console.log("mounting CamperRow");
  }

  componentDidMount(){
    console.log("mounted CamperRow");
  }

  render() {
    return (
      <tr>
        <td className="rank" >{this.props.count}</td>
        <td className="user"><img className="avatar img-fluid img-thumbnail float-left" src={this.props.camper.img} alt="avatar"/><span className="userName">{this.props.camper.username}</span></td>
        <td className="recent" >{this.props.camper.recent}</td>
        <td className="alltime" >{this.props.camper.alltime}</td>
      </tr>
    );
  }
}



class CamperTable extends Component {
  constructor(props){
    super(props);
    this.handleData = this.handleData.bind(this);
  }

  componentWillMount(){
    console.log("mounting CamperTable");
  }

  componentDidMount(){
    console.log("mounted CamperTable");

  }

  componentWillUpdate(){
    console.log("updating CamperTable");
  }

  handleData(e){
    const time = e.target.getAttribute("name");
    this.props.getData(time);
  }

  render() {
    let users = [];
    let count = 1;
    this.props.camper.forEach((user)=>{
      users.push(<CamperRow camper={user} count={count} key={user.username} />);
      count++;
    })
    console.log("users: ",users);

    return (
      <div>
        <table className="table table-hover table-striped table-bordered">
          <tbody>
          <tr>
            <th className="rank">Rank</th>
            <th className="user">User</th>
            <th className="recent" name="recent" onClick={this.handleData}>Recent</th>
            <th className="alltime" name="alltime" onClick={this.handleData}>Alltime</th>
          </tr>

            {users}

          </tbody>
        </table>
      </div>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {camper: []};
    this.getData = this.getData.bind(this);
  }


  getData(time) {
    axios.get("https://fcctop100.herokuapp.com/api/fccusers/top/"+time).then(data => {
      CAMPERS.length = 0;
      data.data.forEach((item) => {
        CAMPERS.push(item);
      });
      this.setState({camper: CAMPERS});
    }).catch(function (error) {
      console.log(error);
    });
    console.log("gotData");
  }

  componentWillMount(){
    console.log("mounting App");
  }

  componentDidMount(){
    console.log("mounted App");
    this.getData("alltime");
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Camper Leaderboard</h2>
          <p>Click on Recent or Alltime to sort campers</p>
        </div>
              <CamperTable camper={this.state.camper} getData={this.getData} />
      </div>
    );
  }
}

let CAMPERS=[]

export default App;
