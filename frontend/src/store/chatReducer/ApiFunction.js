import axios from 'axios';

async function editUserDataApi(rejectWithValue, data, url) {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

async function getPlayerStatsApi(rejectWithValue, url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

export {
  editUserDataApi, getPlayerStatsApi,
};
