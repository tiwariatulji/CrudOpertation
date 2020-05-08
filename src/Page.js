import React, { Component } from 'react'
// import React from 'react'

const initialState = {
    name: "",
    Mobile:"",
    email: "",
    nameError: "",
    mobileError: "",
    emailError: "",
    userData: [{
        id: '1',
        name: 'Atul Tiwari',
        mobile: '8090224440',
        email:"atultiwari@itservicesindia"
    }, {
        id: '2',
        name: 'Test',
        mobile: '9852452',
        email:"atultiwari@gamil.com"
    }]

  };
  
  export default class Page extends React.Component {
    state = initialState;
  
    handleChange = event => {
    this.setState({[event.target.name]:event.target.value})
  
    
    };
  
    validate = () => {
      let nameError = "";
      let emailError = "";
      let mobileError = "";
  
      if (!this.state.name) {
        nameError = "name cannot be blank";
      }
  
      if (!this.state.email.includes("@")) {
        emailError = "invalid email";
      }
  
      if (emailError || nameError) {
        this.setState({ emailError, nameError });
        return false;
      }
  
      return true;
    };
  
    handleSubmit = event => {
      event.preventDefault();
      const isValid = this.validate();
      if (isValid) {
        const pushData = {
            id: 5,
            name: this.state.name,
            mobile: this.state.MobileNo,
            email: this.state.email,
        }
        const data = this.state.userData;
        data.push(pushData);
        this.setState({ userData: data });

        console.log(this.state);
        // clear form
        this.setState(initialState);
        alert("User Add confirmation")
      }
    };
    deleteRecord = id => {
        console.log(id);
        const data = this.state.userData;
        const tempData = data.filter(item => item.id !== id);
        this.setState({ userData: tempData });
    }
  
    render() {
      return (
          <div>
        <form onSubmit={this.handleSubmit}>
             <h1>Form UserRegistration </h1>
          <div>
              <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.nameError}
            </div><br/>
  
  
          </div>
          <div>
              <label>Phone No</label>
            <input
              type="number"
              name="mobile"
              placeholder="Mobile"
              value={this.state.mobile}
              onChange={this.handleChange}
            />
    
          </div><br/>

          <div>
              <label>Email Address</label>
            <input
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.emailError}
            </div>
          </div><br/>
          <button type="submit">Add user</button>
        </form>
        <div className="registrstion-table">  
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mobile No</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.userData.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button >Edit</button>
                                        
                                            <button onClick={() => this.deleteRecord(item.id)}>Delete</button>
                                        </td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table>
              </div>


        </div>
        
      );
    }
  }