import loginTemplate from './login.tpl.html';
import './Login.css';

class Login{
    constructor(){

    }
    login(){
        alert('login called');
    }
    signup(){
        alert('signup called');
    }
    attachEventListener(){
        document.querySelector('#search_result').addEventListener('click', (e) => {
            if(e.target.id === 'btn-signup'){
                e.preventDefault();
                this.login();
            }
            else if (e.target.id === 'btn-login'){
                e.preventDefault();
                this.signup();
            }
        });
    }
    render(){
        return loginTemplate();
    }
}

export default Login;