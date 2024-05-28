import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from "@mui/material";

function ScorePanel() {
  const {eventId} = useParams();
  const [contestantRankings, setContestantRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContestantRankings();
  }, []);

  const fetchContestantRankings = async () => {
    try {
      const response = await axios.get(`http://localhost:8001/event/${eventId}/contestantRankings`);
      setContestantRankings(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contestant rankings:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Contestant Rankings
      </Typography>
      {loading ? (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Contestant Name</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contestantRankings.map((ranking, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{ranking.contestantName}</TableCell>
                  <TableCell>{ranking.averageScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default ScorePanel;
