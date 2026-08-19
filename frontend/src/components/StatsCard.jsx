function StatsCard({ title, value }) {

    return (
        <div className="stats-card">

            <div className="stats-card-content">

                <h3>{title}</h3>

                <p>{value}</p>

            </div>

        </div>
    );
}

export default StatsCard;