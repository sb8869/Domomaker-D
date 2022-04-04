const helper = require('./helper.js');

const handleDomo = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const color = e.target.querySelector('#domoColor').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!name || !age) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, { name, age, color, _csrf }, loadDomosFromServer);

    return false;
};

const DomoForm = (props) => {
    return (
        <form action="/maker" 
            id="domoForm"
            onSubmit={handleDomo}
            name="domoForm"
            method='POST'
            className='domoForm'
        >
            <label htmlFor="name">Name: </label>
            <input type="text" id="domoName" name='name' placeholder='Domo Name' />
            <label htmlFor="age">Age: </label>
            <input type="number" id="domoAge" min="0" name="age" />
            <label htmlFor="color">Color: </label>
            <input type="text" id="domoColor" name="color" placeholder='Domo Color' />
            <input type="hidden" name="_csrf" id="_csrf" value={props.csrf} />
            <input type="submit" className='makeDomoSubmit' value='Make Domo' />
            <button id="clearDomos" className='clearDomos'>Clear All</button>
        </form>
    );
};

const DomoList = (props) => {
    if (props.domos.length === 0) {
        return (
            <div className='domoList'>
                <h3 className='emptyDomo'>No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => {
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className='domoFace' />
                <h3 className='domoName'>Name: {domo.name}</h3>
                <h3 className='domoAge'>Age: {domo.age}</h3>
                <h3 className='domoColor'>Color: {domo.color}</h3>
            </div>
        );
    });

    return (
        <div className='domoList'>
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(
        <DomoList domos={data.domos} />,
        document.getElementById('domos')
    );
};


const init = async () => {
    const response = await fetch ('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <DomoForm csrf={data.csrfToken} />,
        document.getElementById('makeDomo')
    );

    ReactDOM.render(
        <DomoList domos={[]} />,
        document.getElementById('domos')
    );

    const clearButton = document.getElementById('clearDomos');

    clearButton.addEventListener('click', (e) => {

    })

    loadDomosFromServer();
};

window.onload = init;