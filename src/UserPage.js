import React, { Component } from 'react'

export default class UserPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            MobileNo: '',
            email: '',
            nameError: " ",
            mobileError: "",
            emailError: "",
            userData: [{
                id: '1',
                name: 'Atul Tiwari',
                mobile: '8090224440'
            }, {
                id: '2',
                name: 'Test',
                mobile: '9852452'
            }]


        }
        this.handelChnage = this.handelChnage.bind(this)
    }

    handelChnage(event) {
        console.log(event.target.value);
        this.setState({ [event.target.name]: event.target.value })
    }




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

    handleSubmit = (event) => {
        event.preventDefault()
        const valid = this.validate()
        if (valid) {
            const pushData = {
                id: 5,
                name: this.state.name,
                mobile: this.state.MobileNo,
                email: this.state.email,
            }
            const data = this.state.userData;
            data.push(pushData);
            this.setState({ userData: data });
            alert("form has been register")
            console.log(this.state);
        }

    }
    deleteRecord = id => {
        console.log(id);
        const data = this.state.userData;
        const tempData = data.filter(item => item.id !== id);
        this.setState({ userData: tempData });
    }


    render() {

        return (
            <div>
                <from onSubmit={this.handleSubmit}>
                    <h1>Form UserRegistration </h1>
                    <label>Name</label>
                    <input type='text'
                        name="name"
                        value={this.state.name} placeholder="Name" onChange={this.handelChnage} /> <br />
                    <p style={{ color: "red", fontSize: "14px" }}>{this.state.nameError}</p>

                    <label>Mobile No</label>
                    <input type="number"
                        name="MobileNo"
                        value={this.state.MobileNo} placeholder="Mobile No" onChange={this.handelChnage} /><br />
                    <p>{this.setState.mobileError}</p>

                    <label>Email Adress</label>
                    <input type="email"
                        name="email" value={this.state.email} placeholder="Email Address"
                        value={this.state.email} onChange={this.handelChnage} /> <br />
                    <p>{this.setState.emailError}</p>

                    <button value="submit" >Submit</button>

                </from>
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
                                            <button>Add</button>
                                            <button onClick={() => this.deleteRecord(item.id)}>Delete</button>
                                        </td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
