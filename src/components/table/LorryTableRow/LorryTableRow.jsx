import { useState } from "react";
import StatusBadge from "../statusBadge/StatusBadge";
import { BsInfoCircle as InfoIco } from "react-icons/bs";
import { RiDeleteBin2Line as BinIco } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteLorryById } from "../../../state/lorry/lorrySlice";
import { formatTime } from "../../../utils/formatTime";
import { LORRY_STATUSES } from "../../../constants/lorry-statuses";

import "./LorryTableRow.css";

import Modal from "../../ui/modal/Modal";
import UpdateStatusForm from "../../forms/updateStatusForm/UpdateStatusForm";
import DeleteLorryForm from "../../forms/DeleteCollectionForm.jsx/DeleteLorryForm";
import LorryInfoForm from "../../forms/CollectionInfoForm/LorryInfoForm";

export default function LorryTableRow({ lorry }) {
    const dispatch = useDispatch();
    const userLoggedIn = true;

    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const {
        lorryId,
        materialName,
        customerName,
        collectionRefNum,
        checkedInAt,
        currentStatus,
    } = lorry;

    const handleStatusClick = () => setIsStatusModalOpen(true)
    const handleInfoClick = () => setIsInfoModalOpen(true);
    const handleDeleteClick = () => setIsDeleteModalOpen(true);
    //const handleDeleteClick = (lorryId) => dispatch(deleteLorryById(lorryId));


    const handleStatusClose = () => setIsStatusModalOpen(false);
    const handleInfoClose = () => setIsInfoModalOpen(false);
    const handleDeleteClose = () => setIsDeleteModalOpen(false);


    return (
        <>
            <tr className="lorry-table-row">
                <td>
                    <button
                        className="cell-btn material-name"
                        aria-label="Change material name"
                    >
                        <div>{materialName}</div>
                    </button>
                    <div className="time-checked-in">
                        {formatTime(checkedInAt)}
                    </div>
                </td>

                <td>
                    <button
                        className="cell-btn customer-name"
                        aria-label="Change customer name"
                    >
                        {customerName}
                    </button>
                </td>

                <td>
                    <button
                        className="cell-btn collection-ref-number"
                        aria-label="Change collection reference number"
                    >
                        {collectionRefNum}
                    </button>
                </td>

                <StatusBadge
                    currentStatus={currentStatus}
                    lorryId={lorryId}
                    onClick={handleStatusClick}
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
            </tr >

            <tr>
                <td>
                    <Modal isOpen={isInfoModalOpen} onClose={handleInfoClose}>
                        <LorryInfoForm lorry={lorry} />
                    </Modal>
                </td>
                <td>
                    <Modal isOpen={isStatusModalOpen} onClose={handleStatusClose}>
                        <UpdateStatusForm lorry={lorry} onCancel={handleStatusClose} />
                    </Modal>
                </td>
                <td>
                    <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteClose}>
                        <DeleteLorryForm lorry={lorry} onCancel={handleDeleteClose} />
                    </Modal>
                </td>
            </tr>
        </>
    );
}
