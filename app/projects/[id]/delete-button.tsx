"use client";

import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DeleteButton = ({ projectId }: { projectId: number }) => {

  const router = useRouter()
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteProject = async () => {
    try {
      setIsDeleting(true)
      await axios.delete("/api/projects/" + projectId)
      router.push("/projects")
      router.refresh()
    } catch (error) {
      setIsDeleting(false)
      setOpenModal(false)
      setError("Unknown Error Occured")
    }
  }

  return (
    <>
      <Button color="failure" onClick={() => setOpenModal(true)}>Delete Project</Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 size-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this project?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" disabled={isDeleting} onClick={deleteProject}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" disabled={isDeleting} onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DeleteButton