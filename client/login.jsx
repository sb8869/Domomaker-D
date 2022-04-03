const helper = require('./helper.js');

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass, _csrf });
    
    return false;
};

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!username || !pass || !pass2) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass, pass2, _csrf });

    return false;
}

const LoginWindow = (props) => {
    return (
        <form id='loginForm'
            name='loginForm'
            onSubmit={handleLogin}
            action='/login'
            method='POST'
            className='mainForm'
        >
            <label htmlFor="username">Username: </label>
            <input type="text" id="user" name='username' placeholder='username' />
            <label htmlFor="pass">Password: </label>
            <input type="password" id="pass" placeholder='password' />
            <input type="hidden" id="_csrf" name='_csrf' value={props.csrf} />
            <input type="submit" className='formSubmit' value="Sign in" />
        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name='signupForm'
            onSubmit={handleSignup}
            action="/signup"
            method='POST'
            className='mainForm'
        >
            <label htmlFor="username">Username: </label>
            <input type="text" id="user" name='username' placeholder='username' />
            <label htmlFor="pass">Password: </label>
            <input type="password" id="pass" name='pass' placeholder='password' />
            <label htmlFor="pass2">Password: </label>
            <input type="password" id="pass2" name='pass2' placeholder='retype password' />
            <input type="hidden" id="_csrf" value={props.csrf} />
            <input type="submit" className='formSubmit' value="Sign in" />
        </form>
    );
};