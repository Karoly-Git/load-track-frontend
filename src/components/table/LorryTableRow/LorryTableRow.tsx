import { useState, useEffect } from "react";
import type { Lorry } from "../../../types/lorry";
import StatusBadge from "../statusBadge/StatusBadge";
import { BsInfoCircle as InfoIco } from "react-icons/bs";
import { RiDeleteBin2Line as BinIco } from "react-icons/ri";
import { getLorryById } from "../../../api/lorries.api";
import "./LorryTableRow.css";

interface LorryTableRowProps {
    lorry: Lorry;
}

export default function LorryTableRow({ lorry }: LorryTableRowProps) {
    const [userLoggedIn] = useState<boolean>(true);

    const {
        lorryId,
        materialName,
        customerName,
        collectionRefNum,
        currentStatus
    } = lorry;

    /* ====== CELL CLICK HANDLERS ====== */

    function handleMaterialClick(lorryId: string): void {
        console.log("Material clicked for lorry:", lorryId);
    }

    function handleCustomerClick(lorryId: string): void {
        console.log("Customer clicked for lorry:", lorryId);
    }

    function handleCollectionRefClick(lorryId: string): void {
        console.log("Collection ref clicked for lorry:", lorryId);
    }

    /* ====== ACTION ICON HANDLERS ====== */

    function handleInfoClick(lorryId: string): void {
        console.log("Info clicked for lorry:", lorryId);
    }

    function handleDeleteClick(lorryId: string): void {
        console.log("Delete clicked for lorry:", lorryId);
    }

    return (
        <tr className="lorry-table-row">
            <td>
                <button
                    className="cell-btn material-name"
                    onClick={() => handleMaterialClick(lorryId)}
                >
                    {materialName}
                </button>
            </td>

            <td>
                <button
                    className="cell-btn customer-name"
                    onClick={() => handleCustomerClick(lorryId)}
                >
                    {customerName}
                </button>
            </td>

            <td>
                <button
                    className="cell-btn collection-ref-number"
                    onClick={() => handleCollectionRefClick(lorryId)}
                >
                    {collectionRefNum}
                </button>
            </td>

            <StatusBadge
                currentStatus={currentStatus}
                lorryId={lorryId}
            />

            <td className="action">
                <button
                    className="icon-btn info"
                    aria-label="View details"
                    onClick={() => handleInfoClick(lorryId)}
                >
                    <InfoIco />
                </button>

                {userLoggedIn && (
                    <button
                        className="icon-btn delete"
                        aria-label="Delete lorry"
                        onClick={() => handleDeleteClick(lorryId)}
                    >
                        <BinIco />
                    </button>
                )}
            </td>
        </tr>
    );
}
