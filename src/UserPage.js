import React, { Component } from 'react'
// import React from 'react'
import "./App.css"

const initialState = {
    name: "",
    mobile:"",
    email: "",
    nameError: "",
    mobileError: "",
    emailError: "",
    userData: [],
    editView: false,
    editId: '',
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
      else if (!/^[A-Z]+$/i.test(this.state.name)) {
        nameError = "name should not have numbers";
      }
      if (!this.state.email) emailError = 'email cannot be blank';
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
        emailError = 'Invalid email address'
      }
      if (!this.state.mobile) mobileError = 'mobile cannot be blank';
      else if (this.state.mobile.length > 10) {
        mobileError = 'Mobile number should be only 10 chanracter'
      }
      
      if (emailError || nameError || mobileError ) {
        this.setState({ emailError, nameError, mobileError});
        return false;
      }
  
      return true;
    };
  
    handleSubmit = event => {
      event.preventDefault();
      const isValid = this.validate();
        if (isValid) {
          if (!this.state.editView) {
            let lastId = 0
            if (this.state.userData.length) {
              const lastUserId = this.state.userData[this.state.userData.length - 1].id;
              lastId = lastUserId + 1
            }
            const pushData = {
                id: lastId,
                name: this.state.name,
                mobile: this.state.mobile,
                email: this.state.email,
            }
            const data = this.state.userData;
            data.push(pushData);
            this.setState({ userData: data });

            console.log(this.state);
            // clear form
            this.setState(initialState);
            alert("User Add confirmation");
          } else {
            this.editUser()
          }
        }
    };
    editUser() {
      const filterUser = this.state.userData.filter(item => item.id === this.state.editId);
      const userData = this.state.userData;
      const getIndex = userData.indexOf(filterUser[0]);
      userData[getIndex].name = this.state.name;
      userData[getIndex].email = this.state.email;
      userData[getIndex].mobile = this.state.mobile;
      this.setState({ userData: userData, name: '', email: '', mobile: '', editView: false, editId: '' });
      alert('User Data has been updated');
    }
    deleteRecord = id => {
        console.log(id);
        const data = this.state.userData;
        const tempData = data.filter(item => item.id !== id);
        this.setState({ userData: tempData });
    }
  
    editData = id => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.setState({ editView: true, editId: id });
        const filterUser = this.state.userData.filter(item => item.id === id);
        this.setState({
          name: filterUser[0].name,
          mobile: filterUser[0].mobile,
          email: filterUser[0].email,
        })
    }
     noRecordsData() {
       if (!this.state.userData.length) {
         return (
           <tr>
             <td colSpan="4">No records found</td>
           </tr>
         )
       }
     }
    render() {
      return (
          <div>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="registration-area">  
             <h1>Form UserRegistration </h1>
          <div className="field-name">
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
          <div className="field-name">
              <label>Phone No</label>
            <input
              type="number"
              name="mobile"
              placeholder="Mobile"
              value={this.state.mobile}
              onChange={this.handleChange}
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.mobileError}
            </div>
          </div><br/>

          <div className="field-name">
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
      <button type="submit"> { this.state.editView ? 'Save user' : 'Add user'}</button>
          </div>
        </form>
        <div className="registrstion-table">  
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mobile No</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                      { this.noRecordsData() }
                        {
                            this.state.userData.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button onClick={()=>this.editData(item.id)} >Edit</button>
                                        
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