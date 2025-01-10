import * as React from 'react';
import './userCard.css';


export default function UserCard({ voter}) {
    console.log("usercard:",voter)
    return (
        <div>
            <div className='User-Card'>
                <div className='userImage'>
                    {
                        voter.profilePicture ? (<img src={voter.profilePicture} alt='voter-image-no' />) : (<p>No image</p>)
                    }
                </div><br />
                <div className='userDetails1'>
                    <p><h6>Name: &nbsp; {voter.firstName}&nbsp;{voter.lastName}</h6> </p>
                    <p><h6>Age: &nbsp;{voter.age}</h6></p>
                    <p><h6>Phone: &nbsp;{voter.phone}</h6> </p>
                    <p><h6>VoterID: &nbsp;{voter.voterId}</h6>  </p>
                    <p><h6>Voter Status: &nbsp;{voter.voteStatus && (<span className='Voted'>Voted</span>)}{(!voter.voteStatus) && (<span className='notVoted'>Not Voted</span>)}</h6>  </p>
                </div>
            </div>
        </div>
    );
}