import React, { Component } from 'react'
import configuration from '../../Configuration';

class VulnerabilitiesList extends Component {
    state = {
        vulnerabilities: []
    }

    componentDidMount() {
        fetch(`${configuration.api.baseUrl}/vulnerabilities`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then((response) => response.json())
            .then((data) => this.setState({ vulnerabilities: data }));
    }

    render() {
        return (
            <>
            <div className='heading'>
                <h1>Vulnerabilities</h1>
                <button ><i data-feather='plus' className='mr-2'/> Create Vulnerability</button>
            </div>

                <table className='w-full my-4'>
                    <thead>
                        <tr>
                            <th>Date/Time</th>
                            <th>Summary</th>
                            <th>Description</th>
                            <th>Risk</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.vulnerabilities.map((vulnerability, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{vulnerability.insert_ts}</td>
                                        <td>{vulnerability.summary}</td>
                                        <td>{vulnerability.description}</td>
                                        <td>{vulnerability.risk}</td>
                                        <td>OPEN</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

export default VulnerabilitiesList