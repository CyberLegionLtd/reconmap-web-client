import PageTitle from 'components/logic/PageTitle';
import DeleteIconButton from 'components/ui/buttons/DeleteIconButton';
import { useHistory } from 'react-router';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import Breadcrumb from '../ui/Breadcrumb';
import CreateButton from "../ui/buttons/Create";
import LinkButton from "../ui/buttons/Link";
import ExternalLink from "../ui/ExternalLink";
import { IconBriefcase } from '../ui/Icons';
import Loading from '../ui/Loading';
import NoResults from "../ui/NoResults";
import Title from '../ui/Title';
import ClientLink from "./Link";

const ClientsList = () => {
    const history = useHistory();
    const [clients, updateTasks] = useFetch('/clients')

    const destroy = useDelete('/clients/', updateTasks);
    const handleCreateClient = () => {
        history.push(`/clients/create`)
    }

    return <>
        <PageTitle value="Clients" />
        <div className='heading'>
            <Breadcrumb />

            <CreateButton onClick={handleCreateClient}>Create Client</CreateButton>
        </div>
        <Title title='Clients' icon={<IconBriefcase />} />

        {!clients ?
            <Loading /> :
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '190px' }}>Name</th>
                        <th>URL</th>
                        <th>Contact name</th>
                        <th>Contact email</th>
                        <th colSpan={2}>Contact phone</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.length === 0 ?
                        <tr>
                            <td colSpan={6}><NoResults /></td>
                        </tr> :
                        clients.map((client) =>
                            <tr key={client.id}>
                                <td><ClientLink clientId={client.id}>{client.name}</ClientLink></td>
                                <td>{client.url ? <ExternalLink href={client.url}>{client.url}</ExternalLink> : '-'}</td>
                                <td>{client.contact_name || '-'}</td>
                                <td>{client.contact_email || '-'}</td>
                                <td>{client.contact_phone || '-'}</td>
                                <td className='flex justify-end'>
                                    <LinkButton href={`/clients/${client.id}/edit`}>Edit</LinkButton>
                                    <DeleteIconButton onClick={() => destroy(client.id)} />
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        }
    </>
}

export default ClientsList
