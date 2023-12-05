import axios from "axios";

const initailState = {
  stories: [],
  story: {},
  loading: false,
  error: null,
};

const storyReducer = (state = initailState, action) => {
  switch (action.type) {
    case "GET_STORIES_PENDING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_STORIES_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_STORIES_FULFILLED":
      return {
        ...state,
        loading: false,
        stories: action.payload,
      };
    case "GET_STORY_PENDING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_STORY_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_STORY_FULFILLED":
      return {
        ...state,
        loading: false,
        story: action.payload,
      };

    case "POST_STORY_PENDING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "POST_STORY_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "POST_STORY_FULFILLED":
      return {
        ...state,
        loading: false,
      };
    case "UPDATE_LIKE_PENDING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "UPDATE_LIKE_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_LIKE_FULFILLED":
      return {
        ...state,
        loading: false,
      };
    case "ADD_COMMENT_PENDING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "ADD_COMMENT_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ADD_COMMENT_FULFILLED":
      return {
        ...state,
        loading: false,
      };
    case "DELETE_STORY_PENDING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "DELETE_STORY_REJECTED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "DELETE_STORY_FULFILLED":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

function getStoriesRejected(error) {
  return {
    type: "GET_STORIES_REJECTED",
    payload: error,
  };
}
function getStoriesPending() {
  return {
    type: "GET_STORIES_PENDING",
  };
}
function getStoriesFullFilled(data) {
  return {
    type: "GET_STORIES_FULFILLED",
    payload: data,
  };
}

function getStoryRejected(error) {
  return {
    type: "GET_STORY_REJECTED",
    payload: error,
  };
}
function getStoryPending() {
  return {
    type: "GET_STORY_PENDING",
  };
}
function getStoryFullFilled(data) {
  return {
    type: "GET_STORY_FULFILLED",
    payload: data,
  };
}

function postStoryRejected(error) {
  return {
    type: "POST_STORY_REJECTED",
    payload: error,
  };
}

function postStoryPending() {
  return {
    type: "POST_STORY_PENDING",
  };
}
function postStoryFullFilled() {
  return {
    type: "POST_STORY_FULFILLED",
  };
}

function updateLikeRejected(error) {
  return {
    type: "UPDATE_LIKE_REJECTED",
    payload: error,
  };
}

function updateLikePending() {
  return {
    type: "UPDATE_LIKE_PENDING",
  };
}
function updateLikeFullFilled() {
  return {
    type: "UPDATE_LIKE_FULFILLED",
  };
}

function addCommentRejected(error) {
  return {
    type: "ADD_COMMENT_REJECTED",
    payload: error,
  };
}

function addCommentPending() {
  return {
    type: "ADD_COMMENT_PENDING",
  };
}
function addCommentFullFilled() {
  return {
    type: "ADD_COMMENT_FULFILLED",
  };
}

function deleteStoryRejected(error) {
  return {
    type: "DELETE_STORY_REJECTED",
    payload: error,
  };
}

function deleteStoryPending() {
  return {
    type: "DELETE_STORY_PENDING",
  };
}
function deleteStoryFullFilled() {
  return {
    type: "DELETE_STORY_FULFILLED",
  };
}

export function getStories(profile) {
  return async function (dispatch) {
    dispatch(getStoriesPending());
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        profile
          ? `${import.meta.env.VITE_SERVER_URL}/stories?category=profile`
          : `${import.meta.env.VITE_SERVER_URL}/stories`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getStoriesFullFilled(response.data.data));
    } catch (error) {
      dispatch(getStoriesRejected(error));
    }
  };
}

export function getStory(id) {
  return async function (dispatch) {
    dispatch(getStoryPending());
    // console.log("samnsannas");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/stories/" + id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getStoryFullFilled(response.data.data));
    } catch (error) {
      dispatch(getStoryRejected(error.message));
    }
  };
}

export function postStory(data) {
  return async function (dispatch) {
    dispatch(postStoryPending());
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/stories`,
        { content: data },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(postStoryFullFilled());
    } catch (error) {
      dispatch(postStoryRejected(error.message));
    }
  };
}

export function updateLike(id) {
  return async function (dispatch) {
    dispatch(updateLikePending());
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/stories/${id}/like`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateLikeFullFilled());
    } catch (error) {
      dispatch(updateLikeRejected(error.message));
    }
  };
}

export function addComment(data, id) {
  return async function (dispatch) {
    dispatch(addCommentPending());
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/stories/${id}/comment`,
        { comment: data },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addCommentFullFilled());
    } catch (error) {
      dispatch(addCommentRejected(error.message));
    }
  };
}

export function deleteStory(id) {
  return async function (dispatch) {
    dispatch(deleteStoryPending());
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/stories/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteStoryFullFilled());
    } catch (error) {
      dispatch(deleteStoryRejected(error.message));
    }
  };
}

export default storyReducer;
