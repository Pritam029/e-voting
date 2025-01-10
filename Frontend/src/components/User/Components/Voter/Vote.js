import './Vote.css';
import UserNavbar from '../../../Navbar/UserNavbar';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ScrollReveal from "scrollreveal";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { BASE_URL } from '../../../../helper';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'rgb(255, 255, 255)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.common.white,
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const columns = [
    { id: 'fullname', label: `Candidate Name`, minWidth: 250, align: "left" },
    { id: 'party', label: 'Party', minWidth: 120 },
    { id: 'age', label: 'Age', minWidth: 180, align: "center" },
    { id: 'photo', label: 'Symbol', minWidth: 100, align: "right" },
    { id: 'action', label: '', minWidth: 200 },
];

export default function CustomizedTables() {
    const location = useLocation();
    const { voterDetail } = location.state || {}; // Access the passed voterDetail
    const revealRefBottom = useRef(null);
    const revealRefLeft = useRef(null);
    const revealRefRight = useRef(null);
    const revealRefTop = useRef(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        ScrollReveal().reveal(revealRefBottom.current, {
            duration: 1000,
            delay: 300,
            distance: '50px',
            origin: 'bottom',
            easing: 'ease',
            reset: 'true',
        });
    }, []);

    useEffect(() => {
        ScrollReveal().reveal(revealRefRight.current, {
            duration: 1000,
            delay: 300,
            distance: '50px',
            origin: 'right',
            easing: 'ease',
            reset: 'true',
        });
    }, []);

    useEffect(() => {
        ScrollReveal().reveal(revealRefLeft.current, {
            duration: 1000,
            delay: 300,
            distance: '50px',
            origin: 'left',
            easing: 'ease',
            reset: 'true',
        });
    }, []);

    useEffect(() => {
        ScrollReveal().reveal(revealRefTop.current, {
            duration: 1000,
            delay: 300,
            distance: '50px',
            origin: 'top',
            easing: 'ease',
            reset: 'true',
        });
    }, []);

    const [candidates, setCandidates] = useState([]);
    const voterid = voterDetail._id;

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/newCandidate/getCandidate`);
                if (response.data.data) {
                    setCandidates(response.data.data);
                } else {
                    console.error("No candidates found");
                }
            } catch (err) {
                console.error("Error fetching candidates:", err);
            }
        };

        fetchCandidates();
    }, []);

    const [voter, setVoter] = useState({});


    const voterst=voterDetail;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    // Updated handleClose function to navigate with voterDetails
    const handleClose = () => {
        setOpen(false);
        navigate('/User', { state: { voterst } });  // Pass voterDetail in the state
    };


    const handleVote = async (id) => {
        setVoter(voterDetail);
        if (voter.voteStatus) {
            // alert("You Have Already Voted");
        } else {
        try {
            // Update the vote count for the candidate
            const updatedCandidate = await axios.patch(`${BASE_URL}/api/newCandidate/updateVote/${id}`);

            // Update the voter's status
            // console.log(voterDetail._id)
            voterDetail.voteStatus=true;
            await axios.patch(`${BASE_URL}/api/createVoter/updateVote/${voterDetail._id}`);

            // Update the state with the new vote count
            setCandidates(candidates.map(candidate =>
                candidate._id === id ? { ...candidate, votes: updatedCandidate.data.voteCount } : candidate
            ));

            handleOpen();
        } catch (error) {
            console.error('Error voting:', error);
        }
        }
    };

    return (
        <div className='Vote-Page'>
            <UserNavbar />
            <div className='candidate'>
                <h2 ref={revealRefLeft}>2024 India General Election</h2>
                <div className='Heading1' ref={revealRefRight}>
                    <p><span>GIVE</span> Your Vote</p>
                </div>
                {voterDetail && (
                    <div className="voter-details">
                        <h3>Voter Information</h3>
                        <p><strong>Name:</strong> {voterDetail.firstname}</p>
                        <p><strong>Email:</strong> {voterDetail.email}</p>
                    </div>
                )}
                <Modal
                    className='VoteContent'
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open} className='VoteGivenBox'>
                        <Box sx={style} className="MessageBox">
                            <h2>Congratulations!</h2>
                            <h5>You Have Successfully Voted</h5>
                            <button onClick={handleClose}>OK</button>
                        </Box>
                    </Fade>
                </Modal>
                <TableContainer component={Paper} ref={revealRefBottom}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                        <TableHead>
                            <TableRow className='TableRow'>
                                {columns.map((column) => (
                                    <TableCell className='table_row_heading'
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {candidates.map((row) => (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell>
                                        <span className='Name-Row image'>
                                            {row.image ? (
                                                <img alt="Candidate" src={row.image} />
                                            ) : (
                                                <p>No image</p>
                                            )}
                                        </span>
                                        <span className='Name-Row text'>{row.fullName}</span>
                                    </StyledTableCell>
                                    <StyledTableCell align='left'>{row.party}</StyledTableCell>
                                    <StyledTableCell align="center">{row.age}</StyledTableCell>
                                    <StyledTableCell align="right" className='Symbol'>
                                        {row.symbol ? (
                                            <img alt={row.symbol} src={row.symbol} />
                                        ) : (
                                            <p>No image</p>
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell align="right" className="voteButton">
                                        <Button variant="contained" onClick={() => handleVote(row._id)}>Vote</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
