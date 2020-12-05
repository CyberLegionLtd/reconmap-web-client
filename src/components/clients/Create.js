import React, {useState} from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import BtnPrimary from '../ui/buttons/BtnPrimary';
import Title from '../ui/Title';
import CancelButton from "../ui/buttons/Cancel";
import {Link} from "react-router-dom";

export default function ClientCreate({history}) {
    const [newClient, setNewClient] = useState({
        name: null,
        url: null,
        contactName: null,
        contactEmail: null,
        contactPhone: null
    })
    const [loading, setLoading] = useState(false)
    const handleCreate = async (ev) => {
        ev.preventDefault();

        setLoading(true)
        await secureApiFetch(`/clients`, {method: 'POST', body: JSON.stringify(newClient)})
        history.push(`/clients`)
    }
    const handleFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setNewClient({...newClient, [name]: value});
    };
    const handleGoBack = () => {
        history.goBack()
    }

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/clients">Clients</Link>
                </Breadcrumb>
            </div>
            <form onSubmit={handleCreate}>
                <Title title='Create Client'/>
                <label>Name
                    <input type="text" name="name" onChange={handleFormChange} required autoFocus/></label>
                <label>URL
                    <input type="text" name="url" onChange={handleFormChange}/></label>
                <label>Contact name
                    <input type="text" name="contactName" onChange={handleFormChange} required/></label>
                <label>Contact email
                    <input type="email" name="contactEmail" onChange={handleFormChange} required/></label>
                <label>Contact phone
                    <input type="text" name="contactPhone" onChange={handleFormChange}/></label>
                <BtnPrimary type="submit"
                            disabled={loading}>{loading ? 'Wait please' : 'Create'}</BtnPrimary>
                <CancelButton onClick={handleGoBack} disabled={loading}/>
            </form>
        </div>
    )
}
