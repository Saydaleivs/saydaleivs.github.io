import React from 'react'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faBan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export const Users = () => {
  const [selectedUsers, setSelectedUsers] = useState([])
  const [users, setUsers] = useState()

  useEffect(() => {
    axios
      .get('https://social-media-saeed2.onrender.com/api/users', {
        headers: {
          token: document.cookie,
        },
      })
      .then((res) => setUsers(res.data))
  }, [selectedUsers])

  const handleChecks = (e) => {
    const { id, checked } = e.target
    setSelectedUsers([...selectedUsers, id])
    if (!checked) {
      setSelectedUsers(selectedUsers.filter((i) => i !== id))
    }
  }

  const selectAllUsers = () => {
    const id = []
    for (const user of users) {
      id.push(user._id)
    }
    setSelectedUsers([...id])
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    }
  }

  const deleteUsers = () => {
    if (selectedUsers.length === 0) return alert('Please select users first')

    axios
      .post(
        'https://social-media-saeed2.onrender.com/api/users/delete',
        selectedUsers,
        {
          headers: {
            token: document.cookie,
          },
        }
      )
      .then(() => setSelectedUsers([...selectedUsers]))
  }
  const blockUsers = () => {
    if (selectedUsers.length === 0) return alert('Please select users first')

    axios
      .post(
        'https://social-media-saeed2.onrender.com/api/users/block',
        selectedUsers,
        {
          headers: {
            token: document.cookie,
          },
        }
      )
      .then(() => setSelectedUsers([...selectedUsers]))
  }
  const unblockUsers = () => {
    if (selectedUsers.length === 0) return alert('Please select users first')

    axios
      .post(
        'https://social-media-saeed2.onrender.com/api/users/unblock',
        selectedUsers,
        {
          headers: {
            token: document.cookie,
          },
        }
      )
      .then(() => setSelectedUsers([...selectedUsers]))
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th scope='col'>
                    <button
                      style={{ width: 'max-content' }}
                      className='btn btn-secondary'
                      onClick={selectAllUsers}
                    >
                      Select all
                    </button>
                  </th>
                  <th scope='col'>ID</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Last seen time</th>
                  <th scope='col'>Registration time</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>
                    {
                      <FontAwesomeIcon
                        style={{
                          cursor: 'pointer',
                          color: 'red',
                          fontSize: 27,
                          padding: 0,
                          padding: '0 10px 0px 22px',
                        }}
                        icon={faTrash}
                        onClick={deleteUsers}
                      />
                    }
                  </th>
                  <th scope='col'>
                    <FontAwesomeIcon
                      style={{
                        cursor: 'pointer',
                        color: 'red',
                        fontSize: 30,
                        padding: '0 10px 0px 20px',
                      }}
                      icon={faBan}
                      onClick={blockUsers}
                    />
                  </th>
                  <th scope='col' style={{ paddingLeft: 20 }}>
                    <button onClick={unblockUsers} className='btn btn-danger'>
                      Unblock
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className='custom-control custom-checkbox'>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id={user._id}
                          onChange={handleChecks}
                          checked={selectedUsers.includes(user._id)}
                        />
                      </div>
                    </td>

                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.lastTimeSeen}</td>
                    <td>{user.regisTime}</td>
                    <td>{user.status}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
