import React from 'react';
import WorkPost from "../Work/WorkPost.js"

const ProfileProposals = () => {
  return (
    <div className='w-full p-4 rounded-xl max-h-[70vh] overflow-y-auto' id='profileProposalscomponent'>
        <WorkPost/>
        <WorkPost />
        <WorkPost />
        <WorkPost />
    </div>
  )
}

export default ProfileProposals