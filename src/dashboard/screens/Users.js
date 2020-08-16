import React from 'react'

const Users = () => {
    return (
        <>
            <h1>Users</h1>
            <button href="#">Create user</button>

            <table className='w-full'>
                <tbody>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Options</th>
                </tr>
                <tr>
                    <td>root</td>
                    <td>admin</td>
                    <td><a href="#">Delete</a></td>
                </tr>
                <tr>
                    <td>user</td>
                    <td>read-only</td>
                    <td><a href="#">Delete</a></td>
                </tr>
                </tbody>
            </table>
        </>
    )
}

export default Users