import React, { Component } from 'react'
import {Form} from 'react-bootstrap'
import axios from 'axios'
import backgroundImg from './uu.gif';
import jwt_decode from 'jwt-decode'

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


toast.configure();


export class EditUser extends Component {
constructor(props) {
    super(props)

    this.state = {
         user:{
             name:props.name,
             contact_no:props.contact_no,
             staff_id:props.staff_id,
            //  password:props.password,
             id:props.userId,
             role_Id:props.roleId,
             password:'123'
         },
         a:false,
         logedUserId:1
    }
}

componentDidMount(){
  const token = localStorage.usertoken
    const decoded = jwt_decode(token)
  this.setState({logedUserId:decoded.Role_Id})
}


onChange=(e)=>{
  let user=this.state.user;
  user[e.target.name]=e.target.value;
  this.setState({
      user
  })

}

onSubmit=(e)=>{
e.preventDefault();
console.log(this.state)
 axios.put('https://localhost:44396/api/user',this.state.user)
         .then(res=>{
             console.log(res.data)
             toast.success('User profile update Successful',{autoClose:3000 })
         }).catch(err=>{
             console.log(err)
             toast.error('User profile update UnSuccessful,Try again',{autoClose:3000 })
         })

      if(this.state.a){
     
        const user={
          id:this.state.user.id,
          password:this.state.user.password
        }
        console.log(user,'jshhkjh')
        axios.post('https://localhost:44396/api/user/ChangePassword',user)
          .then(res=>{
            console.log("succcc")
          }).catch(err=>{
            console.log(err)
          })
      }   

}

    render() {

      const styles = {
        backgroundContainer: {
            backgroundImage: `url(${backgroundImg})`,
            backgroundRepeat: 'no-repeat',
            //backgroundSize: 'auto',
            //backgroundColor:'#E9967A',
            // height:'600px',
            // width:'800px'
           
        }}

        return (
            <div className="container"  style={styles.backgroundContainer}>
                

        
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
            {/* <form> */}
              <h1 className="h3 mb-3 font-weight-normal"
              onClick={()=>this.setState({a:false})}
               >Edit User/</h1>
               
              <h2 className="text-danger"
              onClick={()=>this.setState({a:!this.state.a})}
              >change password</h2>
              
              <div className="form-group text-info">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                 
                  value={this.state.user.name}
                  onChange={this.onChange}
                />
                 {/* <div className="text-danger">{this.state.errors.name}</div> */}
              </div>

              
              <div className="form-group text-info">
                <label htmlFor="name">Contact No.</label>
                <input
                  type="tel"
                  className="form-control"
                  name="contact_no"
                  placeholder="Enter Contact number"
                  value={this.state.user.contact_no}
                  onChange={this.onChange}
                /><br/>
                 {/* <div className="text-danger">{this.state.errors.contact_no}</div> */}

              </div>
              <div className="form-group text-info">
                <label htmlFor="staff_id">Staff_Id</label>
                <input
                  type="text"
                  className="form-control"
                  name="staff_id"
                  placeholder="Enter Id"
                  value={this.state.user.staff_id}
                  onChange={this.onChange}
                /> 
              </div>

       { this.state.logedUserId==1 ?(
            <div>
              < div className="form-group text-info">
                  <label htmlFor="className">Change User type</label>
                  <Form.Control as="select"
                  name='role_Id'
                  onChange={this.onChange}
                  //value={this.state.user.roleId}
                //   onClick={()=>this.getClassInGrade(this.state.grade)}
                  >   
                     <option>Select user type</option> 
                      <option value='1'>Teacher</option>
                      <option value='2'>Admin</option>
                     </Form.Control>
                    <br />
                    </div>
                    </div>):null}
                  

            {this.state.a? (
              <div>
              <div className="form-group text-info">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  // value={this.state.user.password}
                  onChange={this.onChange}
                />
               </div>
            
                    </div>):null}

                {/* <div className="text-danger">{this.state.errors.password}</div> */}
             
              {/* <div className="form-group">
                <label htmlFor="password"> Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPwd"
                  placeholder="Password"
                  value={this.state.confirmPwd}
                  onChange={this.onChange}
                /><div className="text-danger">{this.state.errors.confirm_password}</div>
              </div> */}
  
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
               Save
              </button>
            </form>
          </div>
        </div>
      </div>
           
        )
    }
}

export default EditUser
