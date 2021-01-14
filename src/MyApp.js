import React, {useEffect, useState} from 'react';
import Table from './Table';
import Form from './Form';
import Axios from 'axios';
import axios from 'axios';

function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect( () => {
        fetchAll().then( result => {
            if (result)
                setCharacters(result);
        });
    }, []);

    function removeOneCharacter(index) {
        const updated = characters.filter( (character, i) => {
            return i !== index
        });
        setCharacters(updated)
    }

    async function fetchAll() {
        try {
            const response = await axios.get('http://localhost:5000/users');
            return response.data.users_list;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function makePostCall(person) {
        try {
            const response = await axios.post('http://localhost:5000/users', person);
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    function updateList(person) {
        makePostCall(person).then( result => {
            if (result.status === 201)
                setCharacters([...characters, person]);
        });
    }

    return (
      <div className="container">
          <Table characterData={characters} removeCharacter={removeOneCharacter}/>
          <Form handleSubmit={updateList}/>
      </div>
    );
}

export default MyApp;