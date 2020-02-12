import React from 'react'

// this.props.onRouteChange
// remember to import prosp


class Register extends React.Component {
	constructor(){
		super()
		this.state = {
			registerEmail : '',
			registerName : '',
			registerPassword : '',
		}
	}

	onNameChange = (event) => {
		this.setState({registerName: event.target.value})
	}

	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value})
	}

	onRegister = () => {
		fetch('https://guarded-brushlands-54149.herokuapp.com/register', {
			method: 'post',
			headers: {'content-type': 'application/json',},
			body: JSON.stringify({
				name: this.state.registerName ,
				email: this.state.registerEmail,
				password: this.state.registerPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				if(user.id){
					this.props.loadUser(user)
					this.props.onRouteChange('home')
				}
			})

	}

	render() {
		return (		
			<div>
				<article className="br3 shadow-3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
					<main className="pa4 black-80">
					  <form className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f5 fw6 ph0 mh0">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
					        <input 
					        	onChange={this.onNameChange}
						        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90" 
						        type="name" 
						        name="name" 
						        id="name"
					        />
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input
						        onChange={this.onEmailChange} 
					        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="email" 
					        	name="email-address"  
					        	id="email-address"
					        />
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input
					        	onChange={this.onPasswordChange} 
					        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="password" 
					        	name="password"  
					        	id="password" 
					        />
					      </div>
					    </fieldset>
					    <div className="mt3">
					      <input
					      	onClick= { this.onRegister } 
					      	//onClick ={() => onRouteChange('home') }
					      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
					      	type="button" 
					      	value="Register" />
					    </div>

					  </form>
					</main>
				</article>
			</div>
			)
	}
}


/*
const Register = ({onRouteChange}) => {
	return (
		<div>
			<article className="br3 shadow-3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
				<main className="pa4 black-80">
				  <form className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f5 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90" type="name" name="name" id="name"/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
				      </div>
				    </fieldset>
				    <div className="mt3">
				      <input 
				      	onClick ={() => onRouteChange('home') }
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
				      	type="submit" 
				      	value="Register" />
				    </div>

				  </form>
				</main>
			</article>
		</div>
	);
}*/

export default Register;