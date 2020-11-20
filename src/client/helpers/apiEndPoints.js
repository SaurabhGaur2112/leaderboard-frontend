const apiEndPoints = {
  leader: {
    getLeaders: () => '/api/v1/leaderboard/',
    createLeader: () => '/api/v1/players/score-add/',
  },
};

export default apiEndPoints;
