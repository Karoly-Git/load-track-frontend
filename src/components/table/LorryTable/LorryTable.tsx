import { useEffect, useState } from "react";
import { getAllLorries } from "../../../api/lorries.api";
import LorryTableRow from "../LorryTableRow/LorryTableRow";
import type { Lorry } from "../../../types/lorry";

import "./LorryTable.css";

export default function LorryTable() {
    const [lorriesData, setLorriesData] = useState<Lorry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getAllLorries()
            .then(setLorriesData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading lorries…</p>;
    if (error) return <p>Failed to load lorries</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th>Material</th>
                    <th>Customer</th>
                    <th>Ref number</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {lorriesData.map(lorry => (
                    <LorryTableRow
                        key={lorry.lorryId}
                        lorry={lorry}
                    />
                ))}
            </tbody>
        </table>
    );
}
