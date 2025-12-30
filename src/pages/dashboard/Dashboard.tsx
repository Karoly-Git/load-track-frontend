import { useState } from "react";
import Button from "../../components/ui/button/Button";
import { GoPlus as PlusIcon } from "react-icons/go";

import Modal from "../../components/ui/modal/Modal";
import LorryTable from "../../components/table/LorryTable/LorryTable";
import AddLorryForm from "../../components/forms/AddLorryForm/AddLorryForm";
import type { LorryData } from "../../components/forms/AddLorryForm/AddLorryForm";

import "./Dashboard.css";

export default function Dashboard() {
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleAdd = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    // Now fully typed because LorryData comes from the form component
    const handleFormSubmit = (lorryData: LorryData) => {
        console.log("New Lorry Added:", lorryData);

        // TODO: Save to global state or backend

        setIsModalOpen(false);
    };

    return (
        <div className="dashboard">
            <div className="dashboard-head">
                <h2>Lorry Overview</h2>
                {userLoggedIn && <Button icon={PlusIcon} text="Add Lorry" onClick={handleAdd} />}
            </div>

            <LorryTable />

            <Modal isOpen={isModalOpen} onClose={handleClose}>
                <AddLorryForm onSubmit={handleFormSubmit} />
            </Modal>
        </div>
    );
}
