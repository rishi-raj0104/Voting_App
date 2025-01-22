import React, { useState, useEffect } from 'react';
import { useGetCandidatesQuery, useVoteForCandidateMutation, useVoteCheckStatusQuery } from '../redux/features/candidateApi';

const Vote = () => {
  const { data: candidates, isLoading: candidatesLoading, isError: candidatesError, error: candidatesErrorMessage } = useGetCandidatesQuery();
  const { data: voteCheckData, isLoading: voteCheckLoading, isError: voteCheckError } = useVoteCheckStatusQuery();
  const [voteForCandidate] = useVoteForCandidateMutation();

  const [voteStatus, setVoteStatus] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isEligibleToVote, setIsEligibleToVote] = useState(true);

  useEffect(() => {
    if (voteCheckData && voteCheckData.msgcode === 'RESTAPI2001') {
      setIsEligibleToVote(false);
    }
  }, [voteCheckData]);

  if (candidatesError) {
    return <div>Error: {candidatesErrorMessage.message}</div>;
  }

  if (candidatesLoading || voteCheckLoading) {
    return <div>Loading...</div>;
  }

  const castVote = async (candidateID) => {
    try {
      await voteForCandidate(candidateID).unwrap();
      setVoteStatus('success');
      setSelectedCandidate(candidateID);
      setIsEligibleToVote(false);
    } catch (err) {
      setVoteStatus('error');
      console.error('Vote failed:', err.data?.message || err.message);
    }
  };

  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Vote for Your Candidate</h2>
        {voteStatus === 'success' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
            You have successfully cast your vote!
          </div>
        )}
        {voteStatus === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
            Failed to cast vote. Please try again.
          </div>
        )}
        {!isEligibleToVote && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6 text-center">
            You have already voted!
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className={`p-6 border rounded-lg shadow-md hover:shadow-lg transition ${
                selectedCandidate === candidate._id ? 'border-green-500' : 'border-gray-300'
              }`}
            >
              <h3 className="text-xl font-bold text-center mb-2">{candidate.name}</h3>
              <p className="text-gray-700 text-center mb-1">Party: {candidate.party}</p>
              <p className="text-gray-700 text-center mb-1">Age: {candidate.age}</p>
              <p className="text-gray-700 text-center mb-4">Votes: {candidate.voteCount}</p>
              <button
                className={`mt-4 px-4 py-2 rounded-md shadow-md w-full ${
                  !isEligibleToVote
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : selectedCandidate === candidate._id
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                onClick={() => castVote(candidate._id)}
                disabled={!isEligibleToVote || selectedCandidate === candidate._id}
              >
                {!isEligibleToVote
                  ? 'Already Voted'
                  : selectedCandidate === candidate._id
                  ? 'Vote Casted'
                  : 'Cast Vote'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vote;
