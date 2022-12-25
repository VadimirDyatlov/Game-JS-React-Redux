import axios from 'axios';

async function getCheckSessionApi(rejectWithValue, url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    if (error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error);
  }
}

async function getUserSingUpApi(rejectWithValue, data, url) {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (error) {
    if (error.response.data) {
      console.log('--->err 1');
      return rejectWithValue(error.response.data);
    }
    console.log('--->err 2');
    return rejectWithValue(error);
  }
}

async function getUserSingInApi(rejectWithValue, data, url) {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (error) {
    if (error.response.data) {
      return rejectWithValue(error.response.data);
    }
    return rejectWithValue(error);
  }
}

async function getUserLogOutApi(rejectWithValue, url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
}

async function editUserDataApi(rejectWithValue, data, url) {
  try {
    console.log('api--->', data);
    const res = await axios.post(url, data);
    console.log('res', res.data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data);
  }
}

export {
  getCheckSessionApi, getUserSingUpApi, getUserSingInApi, getUserLogOutApi, editUserDataApi,
};
