const apiEndPoints = {
  leader: {
    getLeaders: id => `/api/v1/leaderboard/${id}`,
    createLeader: () => '/api/v1/player/create/',
  },
};

export default apiEndPoints;
