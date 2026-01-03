import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LorryTableRow from "../lorryTableRow/LorryTableRow";
import { fetchAllLorries } from "../../../state/lorry/lorrySlice";
import "./LorryTable.css";

export default function LorryTable() {
    const dispatch = useDispatch();

    const { items: lorriesList, loading, error } = useSelector(
        (state) => state.lorries
    );

    useEffect(() => {
        dispatch(fetchAllLorries());
    }, [dispatch]);

    if (loading) return <p>Loading lorries…</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            {
                lorriesList.length === 0 && (
                    <div colSpan={4} className="no-lorry-msg">
                        No lorries currently on site!
                    </div>
                )
            }
            {lorriesList.length !== 0 && (
                <table className="lorry-table" >
                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Customer</th>
                            <th>Reference</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {lorriesList.map((lorry) => (
                            <LorryTableRow
                                key={lorry.lorryId}
                                lorry={lorry}
                            />
                        ))}
                    </tbody>
                </table >
            )}
        </>
    );
}
