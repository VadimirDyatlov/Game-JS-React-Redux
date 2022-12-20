import axios from 'axios';

async function sendUpgradeSkillsApi(rejectWithValue, data, url) {
  try {
    const res = await axios.post(url, data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

function sendUpgradeSkillsApi2() {

}

export {
  sendUpgradeSkillsApi, sendUpgradeSkillsApi2,
};
