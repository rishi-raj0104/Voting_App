import React from 'react';
import { useGetVoteCountsQuery} from '../redux/features/candidateApi';
const Leaderboard = () => {
  const { data: leaderboard, isLoading, isError, error } = useGetVoteCountsQuery();
  if (isError) {
    return <div className="text-center text-lg text-red-500">{error.message || 'Error fetching leaderboard'}</div>;
  }
  if (isLoading) {
    return <div className="text-center text-lg">Loading leaderboard...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Leaderboard</h2>
      <div className="space-y-4">
        {leaderboard?.map((entry, index) => (
          <div key={index} className="flex justify-between items-center p-2 border-b">
            <span>{index + 1}. {entry.name}</span>
            <span> {entry.party}</span>
            <span>{entry.count} Votes</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
