import React from 'react'

export default function AttendanceItem({date}) {
  return (
    <div className='d-flex w-100 align-items-center justify-content-between mt-4 mb-4'>
        
        <div className="name-orgId-cnt d-flex align-items-center">
            <div className="me-3">
            {date}
            </div>
        </div>
    </div>
  )
}
