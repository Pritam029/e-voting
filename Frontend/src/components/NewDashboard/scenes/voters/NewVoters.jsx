import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Button, Modal, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import Header from "../../newComponents/Header";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import axios from 'axios';
import { BASE_URL } from '../../../../helper';

const Team = () => {
    const [theme, colorMode] = useMode();
    const [voters, setVoters] = useState([]);
    const [selectedVoter, setSelectedVoter] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const colors = tokens(theme.palette.mode);

    const fetchVoters = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/createVoter/getVoters`);
            setVoters(response.data);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    const deleteVoter = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/createVoter/deleteVoters/${id}`);
            setVoters(voters.filter(voter => voter._id !== id));
        } catch (error) {
            console.error('Error deleting voter', error);
        }
    };

    const handleEditClick = (voter) => {
        setSelectedVoter(voter);
        setEditModalOpen(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedVoter((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async () => {
        try {
            const { profilePicture, voteStatus, ...editableFields } = selectedVoter;
            await axios.put(`${BASE_URL}/api/createVoter/updateVoterDetails/${selectedVoter._id}`, editableFields);
            setEditModalOpen(false);
            fetchVoters();
        } catch (error) {
            console.error("Error updating voter:", error);
        }
    };

    const columns = [
        {
            field: "profilePicture",
            headerName: "PHOTO",
            renderCell: ({ row: { profilePicture } }) => (
                <Box
                    width="60%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                >
                    <img src={profilePicture} alt="no_image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                </Box>
            ),
        },
        {
            field: "firstName",
            headerName: "FIRST NAME",
            cellClassName: "name-column--cell",
        },
        {
            field: "lastName",
            headerName: "LAST NAME",
            cellClassName: "name-column--cell",
        },
        {
            field: "age",
            headerName: "AGE",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "phone",
            headerName: "Phone Number",
        },
        {
            field: "voterid",
            headerName: "VOTER ID",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "email",
            headerName: "EMAIL",
        },
        {
            headerName: "ACTION",
            flex: 1,
            renderCell: ({ row }) => (
                <Box>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: colors.blueAccent[600], color: 'white', marginRight: 2 }}
                        onClick={() => handleEditClick(row)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: colors.redAccent[600], color: 'white', marginRight: 2 }}
                        onClick={() => deleteVoter(row._id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    useEffect(() => {
        fetchVoters();
    }, []);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="appNew">
                    <Sidebar />
                    <main className="content">
                        <Topbar />
                        <Box m="0px 20px">
                            <Header title="VOTERS" subtitle="Managing the Voters" />
                            <Box
                                m="20px 0 0 0"
                                height="70vh"
                                sx={{
                                    "& .MuiDataGrid-root": { border: "none" },
                                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                                    "& .name-column--cell": { color: colors.greenAccent[300] },
                                    "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700] },
                                    "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                                    "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700] },
                                }}
                            >
                                <DataGrid rows={voters} columns={columns} getRowId={(row) => row._id} />
                            </Box>
                        </Box>
                    </main>
                </div>

                {/* Edit Modal */}
                <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                    <Box
                        p={4}
                        sx={{
                            backgroundColor: 'white',
                            margin: 'auto',
                            marginTop: '10%',
                            width: '350px',
                            borderRadius: '8px',
                            boxShadow: 24,
                            border: `2px solid ${colors.blueAccent[600]}`,
                            overflowY: 'auto', // Added to make the modal scrollable if the content exceeds the height
                            maxHeight: '70vh', // Limits the maximum height of the modal
                        }}
                    >
                        <Typography variant="h6" mb={2} sx={{ color: colors.blueAccent[700] }}>Edit Voter</Typography>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={selectedVoter?.firstName || ''}
                            onChange={handleEditChange}
                            fullWidth
                            margin="normal"
                            sx={{ backgroundColor: colors.primary[300], borderRadius: 1 }}
                        />
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={selectedVoter?.lastName || ''}
                            onChange={handleEditChange}
                            fullWidth
                            margin="normal"
                            sx={{ backgroundColor: colors.primary[300], borderRadius: 1 }}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={selectedVoter?.email || ''}
                            onChange={handleEditChange}
                            fullWidth
                            margin="normal"
                            sx={{ backgroundColor: colors.primary[300], borderRadius: 1 }}
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            value={selectedVoter?.phone || ''}
                            onChange={handleEditChange}
                            fullWidth
                            margin="normal"
                            sx={{ backgroundColor: colors.primary[300], borderRadius: 1 }}
                        />
                        <TextField
                            label="Age"
                            name="age"
                            type="number"
                            value={selectedVoter?.age || ''}
                            onChange={handleEditChange}
                            fullWidth
                            margin="normal"
                            sx={{ backgroundColor: colors.primary[300], borderRadius: 1 }}
                        />
                        <Button
                            variant="contained"
                            sx={{ mt: 2, backgroundColor: colors.greenAccent[600], color: 'white' }}
                            fullWidth
                            onClick={handleEditSubmit}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Modal>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default Team;
