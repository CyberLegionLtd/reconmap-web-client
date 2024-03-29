import useFetch from "hooks/useFetch";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const UserActivityStatsWidget = () => {
    const [auditLogStats] = useFetch('/auditlog/stats')

    return <article className='card'>
        <h4>User activity over time</h4>

        {auditLogStats && auditLogStats.length > 0 ?
        <LineChart width={320} height={320} data={auditLogStats}>
            <Line type="monotone" dataKey="total" stroke="var(--primary-color)" strokeWidth="var(--borderWidth)" />
            <CartesianGrid stroke="var(--bg-color)" />
            <XAxis dataKey="log_date" />
            <YAxis dataKey="total" />
        </LineChart> : 
        <p>No enough data to generate the chart.</p>
}
    </article>
}

export default UserActivityStatsWidget
