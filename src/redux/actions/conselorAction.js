import axios from "axios";

export const registerConselor = (userData) => {
    // Logic to register as a counselor
    return async (dispatch) => {
      dispatch({ type: "REGISTER_CONSELOR_REQUEST" });
      try {
        // Make API call to register counselor
        await axios.post(`https://incare-backend-production.up.railway.app/conselors/asconselor`, userData);
        dispatch({ type:"REGISTER_CONSELOR_SUCCESS", payload: userData });
      } catch (error) {
        dispatch({ type: "REGISTER_CONSELOR_FAILURE", payload: error.message });
      }
    };
  };
  
  export const saveSchedule = (newSchedule) => {
    // Logic to save schedule
    return async (dispatch) => {
      dispatch({ type: "SAVE_SCHEDULE_REQUEST" });
      try {
        // Make API call to save schedule
        await axios.post(`https://incare-backend-production.up.railway.app/conselors/save`, newSchedule);
        dispatch({ type: "SAVE_SCHEDULE_SUCCESS", payload: newSchedule });
      } catch (error) {
        dispatch({ type: "SAVE_SCHEDULE_FAILURE", payload: error.message });
      }
    };
  };
  
  export const updateSchedule = (scheduleData) => {
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

  export default {
    registerConselor,
    saveSchedule,
    updateSchedule
  }