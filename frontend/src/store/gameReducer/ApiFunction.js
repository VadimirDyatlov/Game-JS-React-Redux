import axios from 'axios';

async function getHeroApi(rejectWithValue, url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

async function sendGameStatsApi(rejectWithValue, data, url) {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

async function qwe(rejectWithValue, url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log('==>', error);
    if (error.response.data) {
      return rejectWithValue(error.response.data);
    }
    console.log('>>>2<<<', error);
    return rejectWithValue(error);
  }
}

export {
  getHeroApi, sendGameStatsApi, qwe,
};
