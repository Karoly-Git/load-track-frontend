import { useState } from "react";
import StatusBadge from "../StatusBadge/StatusBadge";
import { BsInfoCircle as InfoIco } from "react-icons/bs";
import { RiDeleteBin2Line as BinIco } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { formatTime } from "../../../utils/formatTime";

import "./CollectionTableRow.css";

import Modal from "../../ui/modal/Modal";
import UpdateStatusForm from "../../forms/UpdateStatusForm/UpdateStatusForm";
import CollectionInfoForm from "../../forms/CollectionInfoForm/CollectionInfoForm";
import DeleteCollectionForm from "../../forms/DeleteCollectionForm.jsx/DeleteCollectionForm";

export default function CollectionTableRow({ collection }) {
    const dispatch = useDispatch();
    const userLoggedIn = true;

    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const {
        id,
        materialName,
        customerName,
        collectionRefNum,
        checkedInAt,
        currentStatus,
    } = collection;

    const handleStatusClick = () => setIsStatusModalOpen(true)
    const handleInfoClick = () => setIsInfoModalOpen(true);
    const handleDeleteClick = () => setIsDeleteModalOpen(true);


    const handleStatusClose = () => setIsStatusModalOpen(false);
    const handleInfoClose = () => setIsInfoModalOpen(false);
    const handleDeleteClose = () => setIsDeleteModalOpen(false);


    return (
        <>
            <tr className="collection-table-row">
                <td>
                    <button
                        className="cell-btn material-name"
                        aria-label="Change material name"
                    >
                        <div>{materialName} {id}</div>
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
                    collectionId={id}
                    onClick={handleStatusClick}
                />

                <td className="action">
                    <button
                        className="icon-btn info"
                        aria-label="View details"
                        onClick={() => handleInfoClick(collection)}
                    >
                        <InfoIco />
                    </button>

                    {userLoggedIn && (
                        <button
                            className="icon-btn delete"
                            aria-label="Delete collection"
                            onClick={() => handleDeleteClick(id)}
                        >
                            <BinIco />
                        </button>
                    )}
                </td>
            </tr >

            <tr>
                <td>
                    <Modal isOpen={isInfoModalOpen} onClose={handleInfoClose}>
                        <CollectionInfoForm collection={collection} onCancel={handleInfoClose} />
                    </Modal>
                </td>
                <td>
                    <Modal isOpen={isStatusModalOpen} onClose={handleStatusClose}>
                        <UpdateStatusForm collection={collection} onCancel={handleStatusClose} />
                    </Modal>
                </td>
                <td>
                    <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteClose}>
                        <DeleteCollectionForm collection={collection} onCancel={handleDeleteClose} />
                    </Modal>
                </td>
            </tr>
        </>
    );
}
