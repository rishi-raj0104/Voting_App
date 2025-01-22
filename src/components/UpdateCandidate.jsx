import React, { useState } from 'react';
import { useGetCandidatesQuery, useCreateCandidateMutation, useUpdateCandidateMutation, useDeleteCandidateMutation, } from '../redux/features/candidateApi';

const UpdateCandidate = () => {
  const { data: candidates, isLoading } = useGetCandidatesQuery();
  const [createCandidate] = useCreateCandidateMutation();
  const [updateCandidate] = useUpdateCandidateMutation();
  const [deleteCandidate] = useDeleteCandidateMutation();

  const [editingCandidate, setEditingCandidate] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (isLoading) return <p>Loading candidates...</p>;

  const saveNewCandidate = async (newCandidate) => {
    try {
      await createCandidate(newCandidate).unwrap();
      setShowAddForm(false);
    } catch (error) {
      console.error('Error creating candidate:', error);
    }
  };

  const saveEditCandidate = async (updatedCandidate) => {
    try {
      await updateCandidate({
        candidateID: updatedCandidate._id,
        updatedCandidateData: updatedCandidate,
      }).unwrap();
      setEditingCandidate(null);
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };

  const confirmDeleteCandidate = async () => {
    try {
      await deleteCandidate(candidateToDelete._id).unwrap();
      setShowDeleteModal(false);
      setCandidateToDelete(null);
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Candidate Management</h1>

      {/* Add Candidate Form */}
      {showAddForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newCandidate = {
              name: e.target.name.value,
              party: e.target.party.value,
              age: parseInt(e.target.age.value, 10),
            };
            saveNewCandidate(newCandidate);
          }}
          className="mb-4"
        >
          <input name="name" placeholder="Name" className="w-full mb-4 p-2 border rounded" />
          <input name="party" placeholder="Party" className="w-full mb-4 p-2 border rounded" />
          <input name="age" placeholder="Age" type="number" className="w-full mb-4 p-2 border rounded" />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
        </form>
      )}

      {/* Candidate List */}
      <ul className="mb-4">
        {candidates.map((candidate) => (
          <li key={candidate._id} className="border p-4 mb-2 flex justify-between items-center">
            <div>
              <p className="font-bold">{candidate.name}</p>
              <p>{candidate.party}</p>
              <p>Age: {candidate.age}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingCandidate(candidate)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setCandidateToDelete(candidate);
                  setShowDeleteModal(true);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Candidate Form */}
      {editingCandidate && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const updatedCandidate = {
              _id: editingCandidate._id,
              name: e.target.name.value,
              party: e.target.party.value,
              age: parseInt(e.target.age.value, 10),
            };
            saveEditCandidate(updatedCandidate);
          }}
          className="mb-4"
        >
          <input
            name="name"
            defaultValue={editingCandidate.name}
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            name="party"
            defaultValue={editingCandidate.party}
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            name="age"
            defaultValue={editingCandidate.age}
            type="number"
            className="w-full mb-4 p-2 border rounded"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
        </form>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p>Are you sure you want to delete {candidateToDelete?.name}?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={confirmDeleteCandidate}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Candidate Button */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        {showAddForm ? 'Cancel' : 'Add Candidate'}
      </button>
    </div>
  );
};

export default UpdateCandidate;
