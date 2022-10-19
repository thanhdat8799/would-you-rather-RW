
import { connect } from "react-redux";
import { _getUsers } from "../_DATA";
import { setCurrentUser } from "../actions/auth";
import { getUsers } from "../actions/users";
import { useEffect, useState } from 'react';
import {ListGroup, Figure, Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

import React from 'react'

function LoginPage({auth, users, setCurrentUser, getUsers}) {
    const [loginUser, setLoginUser] = useState(null);
    const history = useHistory()

    useEffect(() => {
        async function fetchData() {
          const users = await _getUsers();
          getUsers(users);
        }
        if (!users )
         fetchData()
    });

    const handleLogIn = () => {
        setCurrentUser(loginUser);
        history.push('/home');
    }
    return (
    <div className='login'>
        <h2>Select users to continue</h2>
        <ListGroup>
        {
            users &&
            Object.values(users).map(user => 
                (
                <ListGroup.Item
                  key={user.id}
                  active={loginUser && user.id === loginUser.id}
                  onClick={() => setLoginUser(user)}
                  variant='warning'
                >
                  <Figure.Image
                    src={user.avatarURL}
                    width={50}
                    height={50}
                    roundedCircle
                    thumbnail
                    className="user-avatar"
                  />

                  <div className="user-info">{user.name}</div>
                </ListGroup.Item>
            )
            )       
        }
        </ListGroup>
        <Button
          className="w-100"
          onClick={handleLogIn}
          disabled={loginUser === null}
        >
          Sign in
        </Button>
    </div>
  )
}

const mapStateToProps = ({auth, users}) => {
    return {
        auth,
        users,
    };
};

export default connect(mapStateToProps, { setCurrentUser, getUsers })(LoginPage)