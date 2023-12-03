import axios from "axios";

export const registerConselor = (userId, token) => {
    // Logic to register as a counselor
    return async (dispatch) => {
    try {
      dispatch({ type: "REGISTER_CONSELOR_REQUEST" });
   
        // Make API call to register counselor
        await axios.post(`https://incare-backend-production.up.railway.app/conselors/asconselor`,
        {
          user_id: "65698347ca1b27d33ef4199c",
          spesialisasi: "Relationship",
          deskripsi: "halo nama saya mark lee"
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
        const newConselor = await response.data;
        dispatch({ type:"REGISTER_CONSELOR_SUCCESS", payload: newConselor, userId});
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