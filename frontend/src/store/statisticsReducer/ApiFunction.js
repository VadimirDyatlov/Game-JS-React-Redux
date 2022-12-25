import axios from 'axios';

async function getPlayersStatsApi(rejectWithValue, url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

async function getStatsTop15Api2(rejectWithValue, url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

export {
  getPlayersStatsApi, getStatsTop15Api2,
};
