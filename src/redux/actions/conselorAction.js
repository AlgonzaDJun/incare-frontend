import axios from "axios";
export function registerConselorRequest(data) {
  return {
    type: "REGISTER_CONSELOR_REQUEST",
    payload: data,
  };
}

export function registerConselorSuccess(user) {
  return {
    type: "REGISTER_CONSELOR_SUCCESS",
    payload: user,
  };
}

export function registerConselorFailure(error) {
  return {
    type: "REGISTER_CONSELOR_FAILURE",
    payload: error,
  };
}

function getScheduleRequest() {
  return {
    type: "GET_SCHEDULE_REQUEST",
  };
}

function getScheduleSuccess(schedule) {
  return {
    type: "GET_SCHEDULE_SUCCESS",
    payload: schedule,
  };
}

function getScheduleFailed(error) {
  return {
    type: "GET_SCHEDULE_FAILED",
    payload: error.message,
  };
}

export function registerConselor(data) {
  return async function (dispatch) {
    dispatch(registerConselorRequest(data));

    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/conselors/asconselor`, data)
      .then((response) => {
        const user = response.data;
        dispatch(registerConselorSuccess(user));
      })
      .catch((error) => {
        dispatch(registerConselorFailure(error));
      });
  };
}

export const getSchedule = (id) => {
  // Logic to save schedule
  return async (dispatch) => {
    dispatch(getScheduleRequest());
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/conselors/${id}`
      );
      dispatch(getScheduleSuccess(res.data.data.schedule));
      console.log(res.data.data.schedule);
    } catch (error) {
      dispatch(getScheduleFailed(error.message));
    }
  };
};

export const saveSchedule = (data, id) => {
  // Logic to save schedule
  return async (dispatch) => {
    dispatch({ type: "SAVE_SCHEDULE_REQUEST" });
    try {
      // Make API call to save schedule
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/conselors/${id}`,
        data
      );
      dispatch({ type: "SAVE_SCHEDULE_SUCCESS", payload: res });
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
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/conselors` + id,
        scheduleData
      );
      dispatch({ type: "UPDATE_SCHEDULE_SUCCESS", payload: scheduleData });
    } catch (error) {
      dispatch({ type: "UPDATE_SCHEDULE_FAILURE", payload: error.message });
    }
  };
};
