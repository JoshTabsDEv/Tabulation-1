import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, InputAdornment, Grid, Card, CardHeader, CardContent, CardActions, Typography, Tooltip, IconButton, Box, Collapse, Alert } from '@mui/material';
import { Event as EventIcon, DateRange as DateRangeIcon, LocationOn as LocationOnIcon, Add as AddIcon, Delete as DeleteIcon, Start as StartIcon, Visibility as VisibilityIcon} from '@mui/icons-material';
import { Add as PlusIcon, Edit as EditIcon, Close as CloseIcon } from '@mui/icons-material';
import { Formik, Form } from "formik";
import Navbar from './Navbar';

function EventTable() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventName, setEventName] = useState('');
  const [eventDateStart, setEventDateStart] = useState('');
  const [eventDateEnd, setEventDateEnd] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [openAddEventDialog, setOpenAddEventDialog] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/test');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();
  }, [refreshData]);

  const handleOpenAddEventDialog = () => {
    setSelectedEvent(null);
    setEventName('');
    setEventDateStart('');
    setEventDateEnd('');
    setEventLocation('');
    setOpenAddEventDialog(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      // Send a DELETE request to the backend API
      await axios.delete(`http://localhost:8001/test/${eventId}`);
      
      // Refresh data after successful deletion
      setRefreshData(!refreshData);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleOpenEditEventDialog = (event) => {
    setSelectedEvent(event);
    setEventName(event.event_name);
    setEventDateStart(event.event_start_date);
    setEventDateEnd(event.event_end_date);
    setEventLocation(event.event_location);
    setOpenAddEventDialog(true);
  };

  const handleCloseAddEventDialog = () => {
    setOpenAddEventDialog(false);
  };

  const handleAddEvent = async () => {
    // Validate form fields
    if (!eventName || !eventDateStart || !eventDateEnd || !eventLocation) {
      setAlertMessage('Please fill in all required fields');
      setOpenAlert(true);
      return;
    }

    const eventData = {
      event_name: eventName,
      event_start_date: eventDateStart,
      event_end_date: eventDateEnd,
      event_location: eventLocation,
    };

    try {
      if (selectedEvent) {
        // Editing an existing event
        await axios.put(`http://localhost:8001/test/${selectedEvent.event_id}`, eventData);
      } else {
        // Adding a new event
        await axios.post('http://localhost:8001/test', eventData);
        setOpenAddEventDialog(false);
      }

      setRefreshData(!refreshData); // Trigger re-fetching of data
      setAlertMessage('Event saved successfully');
      setOpenAlert(true);
    } catch (error) {
      console.error('Error adding/editing event:', error);
      setAlertMessage('An error occurred while saving the event');
      setOpenAlert(true);
    }
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleStartEvent = (eventId) => {
    navigate(`/eventStart/${eventId}`);
  };

  const handleViewScore = (eventId) => {
    navigate(`/Scores/${eventId}`);
  };

  return (
    <div>
      <Navbar name="Event Management" />
      <Card>
        <CardHeader
          sx={{ textAlign: "start" }}
          title="Events"
          subheader="List of events"
          action={
            <Button variant="outlined" startIcon={<PlusIcon />} onClick={handleOpenAddEventDialog}>Add Event</Button>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ overflowY: 'auto' }}>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      {events.length > 0 ? (
                        <>
                          <th style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F3F4F6', fontWeight: 'bold' }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>ID</Typography>
                          </th>
                          <th style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F3F4F6' }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Event Name</Typography>
                          </th>
                          <th style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F3F4F6' }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Start Date</Typography>
                          </th>
                          <th style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F3F4F6' }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>End Date</Typography>
                          </th>
                          <th style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F3F4F6' }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Location</Typography>
                          </th>
                        </>
                      ) : (
                        <th className='mx-8' colSpan="5" style={{ width: "200px", padding: '1rem', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F3F4F6', textAlign: 'center' }}>
                          <Typography variant="body2">No events available</Typography>
                        </th>
                      )}
                      {events.length > 0 && (
                        <th style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', backgroundColor: '#F3F4F6' }}>Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {events.length > 0 ? (
                      events.map((event, index) => (
                        <tr key={index}>
                          {Object.values(event).map((value, idx) => (
                            <td key={idx} style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>
                              <Typography variant="body2">{value}</Typography>
                            </td>
                          ))}
                          <td style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>
                            <Tooltip title="Edit Event">
                              <IconButton onClick={() => handleOpenEditEventDialog(event)}>
                                <EditIcon style={{ color: '#00008B' }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Event">
                              <IconButton onClick={() => handleDeleteEvent(event.event_id)}>
                                <DeleteIcon style={{ color: 'red' }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Start Event">
                              <IconButton onClick={() => handleStartEvent(event.event_id)}>
                                <StartIcon style={{ color: 'green' }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="View Scores">
                              <IconButton onClick={() => handleViewScore(event.event_id)}>
                                <VisibilityIcon style={{ color: 'grey' }} />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', textAlign: 'center' }}>
                          <Typography variant="body2">No events available</Typography>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions style={{ borderTop: '1px solid #E5E7EB', padding: '1rem' }}>
          <Typography variant="body2">Page 1 of 10</Typography>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant="outlined">Previous</Button>
            <Button variant="outlined">Next</Button>
          </div>
        </CardActions>

        <Formik
          initialValues={{
            eventName: eventName,
            eventDateStart: eventDateStart,
            eventDateEnd: eventDateEnd,
            eventLocation: eventLocation,
          }}
          enableReinitialize
          onSubmit={handleAddEvent}
        >
          {({ handleChange }) => (
            <Form>
              <Dialog open={openAddEventDialog} onClose={handleCloseAddEventDialog} maxWidth="sm" fullWidth>
                <DialogTitle style={{ textAlign: "center" }}>{selectedEvent ? "Edit Event" : "Add Event"}</DialogTitle>
                <DialogContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        label="Event Name"
                        variant="outlined"
                        fullWidth
                        name="eventName"
                        value={eventName}
                        onChange={(e) => {
                          handleChange(e);
                          setEventName(e.target.value);
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start"><EventIcon /></InputAdornment>,
                        }}
                        style={{ marginTop: "10px" }}
                        error={!eventName}
                        helperText={!eventName ? 'Event Name is required' : ''}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Event Date Start"
                        type="date"
                        variant="outlined"
                        name="eventDateStart"
                        value={eventDateStart}
                        onChange={(e) => {
                          handleChange(e);
                          setEventDateStart(e.target.value);
                        }}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start"><DateRangeIcon /></InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Event Date End"
                        type="date"
                        variant="outlined"
                        name="eventDateEnd"
                        value={eventDateEnd}
                        onChange={(e) => {
                          handleChange(e);
                          setEventDateEnd(e.target.value);
                        }}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start"><DateRangeIcon /></InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Event Location"
                        variant="outlined"
                        fullWidth
                        name="eventLocation"
                        value={eventLocation}
                        onChange={(e) => {
                          handleChange(e);
                          setEventLocation(e.target.value);
                        }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>,
                        }}
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: "30px" }}
                    onClick={handleAddEvent} // Use onClick instead of onSubmit
                  >
                    <AddIcon style={{ marginRight: 8 }} /> {selectedEvent ? "Save Changes" : "Add Event"}
                  </Button>
                </DialogActions>
              </Dialog>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

export default EventTable;