import { useState, useEffect } from 'react';
import { Box, Button, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { tokens } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../../theme';
import Sidebar from '../global/Sidebar';
import Topbar from '../global/Topbar';
import Header from '../../newComponents/Header';
import { BASE_URL } from '../../../../helper';

const NewCandidates = () => {
    const [theme, colorMode] = useMode();
    const [candidates, setCandidates] = useState([]);
    const [openDialog, setOpenDialog] = useState(false); // State to control Dialog visibility
    const [selectedCandidate, setSelectedCandidate] = useState(null); // To store the selected candidate data for editing
    const colors = tokens(theme.palette.mode);

    const columns = [
        {
            field: "image",
            headerName: "PHOTO",
            renderCell: ({ row }) => {  // Correctly use 'row' parameter
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                    >
                        <img src={row.image} alt={row.image} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    </Box>
                );
            },
        },
        {
            field: "fullName",
            headerName: "CANDIDATE NAME",
            cellClassName: "name-column--cell",
        },
        {
            field: "bio",
            headerName: "CANDIDATE BIO",
            cellClassName: "name-column--cell",
        },
        {
            field: "party",
            headerName: "PARTY",
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
            headerName: "ACTION",
            flex: 1,
            renderCell: ({ row }) => {  // Correctly use 'row' parameter
                return (
                    <Box>
                        <span id='edit' className='Button-span'>
                            <Button 
                                variant="contained" 
                                sx={{ backgroundColor: colors.blueAccent[600], color: 'white', marginRight: 2 }} 
                                onClick={() => handleEditCandidate(row)}  // Pass 'row' to handleEditCandidate
                            >
                                Edit
                            </Button>
                        </span>
                        <span id='delete' className='Button-span'>
                            <Button 
                                variant="contained" 
                                sx={{ backgroundColor: colors.redAccent[600], color: 'white', marginRight: 2 }} 
                                onClick={() => deleteCandidate(row._id)}  // Pass 'row._id' to deleteCandidate
                            >
                                Delete
                            </Button>
                        </span>
                    </Box>
                );
            },
        },
    ];
    

    const handleEditCandidate = (candidate) => {
        setSelectedCandidate(candidate);
        setOpenDialog(true); // Open dialog to edit candidate
    };

    const handleDialogClose = () => {
        setOpenDialog(false); // Close the dialog
        setSelectedCandidate(null); // Clear selected candidate data
    };

    const handleSaveEdit = async () => {
        try {
            const updatedCandidate = {
                ...selectedCandidate,
                fullName: selectedCandidate.fullName, // Assume the input fields are updated
                bio: selectedCandidate.bio,
                party: selectedCandidate.party,
                age: Number(selectedCandidate.age),
            };
            console.log(updatedCandidate)
            console.log(selectedCandidate)
            const response = await axios.put(`${BASE_URL}/api/newCandidate/editCandidate/${selectedCandidate._id}`, updatedCandidate);

            if (response.data.success) {
                setCandidates(candidates.map(candidate => candidate._id === selectedCandidate._id ? updatedCandidate : candidate));
                handleDialogClose();
            }
        } catch (err) {
            console.error("Error updating candidate:", err);
        }
    };

    const deleteCandidate = async (id) => {
        try {
            // Send DELETE request to backend with candidate ID
            const response = await axios.delete(`${BASE_URL}/api/newCandidate/deleteCandidate/${id}`);
    
            // Check if deletion was successful
            if (response.data.success) {
                // Remove the deleted candidate from the state
                setCandidates(candidates.filter(candidate => candidate._id !== id));
            } else {
                console.error("Failed to delete candidate");
            }
        } catch (error) {
            console.error('Error deleting candidate:', error);
        }
    };
    

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/newCandidate/getCandidate`);
                if (response.data.data) {
                    setCandidates(response.data.data); // Correct data assignment
                } else {
                    console.error("No candidates found");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchCandidates();
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
                            <Header title="CANDIDATES INFORMATION" subtitle="Managing the Candidates" />
                            <Box
                                m="20px 0 0 0"
                                height="70vh"
                                sx={{
                                    "& .MuiDataGrid-root": {
                                        border: "none",
                                    },
                                    "& .MuiDataGrid-cell": {
                                        borderBottom: "none",
                                    },
                                    "& .name-column--cell": {
                                        color: colors.greenAccent[300],
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: colors.blueAccent[700],
                                        borderBottom: "none",
                                    },
                                    "& .MuiDataGrid-virtualScroller": {
                                        backgroundColor: colors.primary[400],
                                    },
                                    "& .MuiDataGrid-footerContainer": {
                                        borderTop: "none",
                                        backgroundColor: colors.blueAccent[700],
                                    },
                                    "& .MuiCheckbox-root": {
                                        color: `${colors.greenAccent[200]} !important`,
                                    },
                                }}
                            >
                                <DataGrid rows={candidates} columns={columns} getRowId={(row) => row._id} />
                            </Box>
                        </Box>
                    </main>
                </div>
            </ThemeProvider>

            {/* Edit Candidate Dialog */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Edit Candidate</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        margin="normal"
                        value={selectedCandidate ? selectedCandidate.fullName : ''}
                        onChange={(e) => setSelectedCandidate({ ...selectedCandidate, fullName: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Bio"
                        variant="outlined"
                        margin="normal"
                        value={selectedCandidate ? selectedCandidate.bio : ''}
                        onChange={(e) => setSelectedCandidate({ ...selectedCandidate, bio: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Party"
                        variant="outlined"
                        margin="normal"
                        value={selectedCandidate ? selectedCandidate.party : ''}
                        onChange={(e) => setSelectedCandidate({ ...selectedCandidate, party: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Age"
                        type="number"
                        variant="outlined"
                        margin="normal"
                        value={selectedCandidate ? selectedCandidate.age : ''}
                        onChange={(e) => setSelectedCandidate({ ...selectedCandidate, age: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </ColorModeContext.Provider>
    );
};

export default NewCandidates;
