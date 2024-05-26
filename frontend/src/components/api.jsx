import axios from 'axios';

const API_URL = 'http://localhost:8001/test';

export const fetchEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const addEvent = async (eventData) => {
  try {
    const response = await axios.post(API_URL, eventData);
    return response.data;
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

export const editEvent = async (eventId, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error editing event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    await axios.delete(`${API_URL}/${eventId}`);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};