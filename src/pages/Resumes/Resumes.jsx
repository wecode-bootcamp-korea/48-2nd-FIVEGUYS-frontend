import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileAttachmentContainer from './FileAttachmentContainer';
import ResumeCard from './ResumeCard';
import AddResume from './AddResume';
import './Resumes.scss';

const BASE_URL = process.env.REACT_APP_API_KEY;

export default function Resumes() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);

  //${BASE_URL}/resumes
  useEffect(() => {
    fetch(
      `/data/data.json`,
      // , {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json;charset=utf-8',
      //   },
      //   body: JSON.stringify({ accessToken: token }),
      // }
    )
      .then(res => res.json())
      .then(data => setResumes(data));
  }, []);

  return (
    <div className="resumes">
      <div className="resumeCardsContainer">
        <h1 className="resumeCardsContainerTitle">이력서 관리</h1>
        <div className="resumeCardPlace">
          {resumes.map((resume, _) => {
            return (
              <ResumeCard
                key={resume.resumeId}
                resume={resume}
                onClick={() => {
                  navigate(`/resume/${resume.resumeId}`);
                }}
              />
            );
          })}
          <AddResume />
        </div>
      </div>
      <div className="resumeAdContainer">
        <img
          src="https://cdn.jumpit.co.kr/jumpit/resume/awesome_resume_banner.webp"
          alt="이력서 광고 배너"
        />
      </div>
      <FileAttachmentContainer />
    </div>
  );
}