import axios from "axios";

export function registerConselorRequest(data) {
  return {
      type: "REGISTER_CONSELOR_REQUEST",
      payload: data,
  }
};

export function registerConselorSuccess(user) {
  return {
      type: "REGISTER_CONSELOR_SUCCESS",
      payload: user,
  }
};

export function registerConselorFailure(error) {
  return {
      type: "REGISTER_CONSELOR_FAILURE",
      payload: error,
  }
};

export function registerConselor(data) {
  return async function(dispatch) {
      dispatch(registerConselorRequest(data));
  
    axios.post(`https://incare-backend-production.up.railway.app/conselors/asconselor`, data)
          .then(response => {
              const user = response.data;
              dispatch(registerConselorSuccess(user));
          })
          .catch(error => {
              dispatch(registerConselorFailure(error.message));
          });
  };
};

  
  export const saveSchedule = (data) => {
    // Logic to save schedule
    return async (dispatch) => {
      dispatch({ type: "SAVE_SCHEDULE_REQUEST" });
      try {
        // Make API call to save schedule
        await axios.post(`https://incare-backend-production.up.railway.app/conselors`, data);
        dispatch({ type: "SAVE_SCHEDULE_SUCCESS", payload:schedule});
      } catch (error) {
        dispatch({ type: "SAVE_SCHEDULE_FAILURE", payload: error.message });
      }
    };
  };
  
  export const updateSchedule = (scheduleData, id) => {
    // Logic to update schedule
    return async (dispatch) => {
      dispatch({ type: "UPDATE_SCHEDULE_REQUEST" });
      try {
        // Make API call to update schedule
        await axios.post(`https://incare-backend-production.up.railway.app/conselors` + id, scheduleData);
        dispatch({ type: "UPDATE_SCHEDULE_SUCCESS", payload: scheduleData });
      } catch (error) {
        dispatch({ type: "UPDATE_SCHEDULE_FAILURE", payload: error.message });
      }
    };
  };