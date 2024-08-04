import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJobs } from '../services/job';
export const Job = () => {
    const { id } = useParams();
    console.log(id)
    const [job, setJob] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchJob = async () => {
            setLoading(true);
            const response = await getJobs({ id });
            if (response.status === 200) {
                setJob(response.data);
            }
            setLoading(false);
        }
        fetchJob();
    }, [])
    return (
        <div className='home'>
            <div className='container flex '>
                <h1 className='text-xl text-ultrabold p-2 ml-20 text-white'>Jobfinder</h1>
                <div className='cnt1 flex flex-row p-2'>
                <a className='border-2 border-white w-20 p-1 px-4 text-white' href="/login">Login</a>
                <a className='ml-20 w-20 bg-white p-1 px-2 text-orange-800' href="/register">Register</a>
                </div>
            </div>
            <div className='cntjob text-ultratrabold'>WordPress Development work from home job/internship at Adyaka Infosec Private Limited</div>
            <div className='cntjob1'>
            {loading ? <h1>Loading...</h1> : (
                <div>
                    <h1 className='text-ultrabold text-xl justify-content gap-y-2'>{job.jobPosition}</h1>
                    <p>{job.companyName}</p>
                    <p>{job.monthlySalary}</p><br></br>
                    <p className='text-l text-black'>About Company<br></br>{job.about}</p><br></br>
                    <p className='text-l text-extrabold'>Job Description<br></br>{job.description}</p><br></br>
                    <p className='text-l text-extrabold'>Skill(s) required<br></br></p>{job.skills && job.skills.map((skill) => {
                        return <span style={{ marginRight: '10px' }} key={skill}>{skill}</span>
                    })}<br></br>
                    <p className='text-l text-extrabold'>Additional Inforamtion<br></br>{job.information}</p>
                    
                </div>
            )}
            </div>
        </div>
    )
}