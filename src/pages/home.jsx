import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getJobs } from '../services/job';
import { verifyToken } from '../utilis/auth';
import { deleteJob } from '../services/job';
import toast from 'react-hot-toast';
import { SKILLS } from './create';
export const Home=() =>{
    const [jobs, setJobs] = useState([]);  // fetched data
    const [filteredJobs, setFilteredJobs] = useState([]);   // data on the UI
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [skills, setSkills] = useState(null);
    const [search, setSearch] = useState('');
    
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setFilteredJobs(jobs.filter((job) => {
            return job.jobPosition.includes(e.target.value) || job.companyName.includes(e.target.value) || job.description.includes(e.target.value);
        }));
    }

    
    const handleDelete = async (id) => {
        try {
            const response = await deleteJob(id);
            if (response.status === 200) {
                toast.success('Job deleted successfully');
                fetchJobs();
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error) {
            toast.error('Job deletion failed');
        }
    }


    const fetchJobs = async ({ skills }) => {
        setLoading(true);
        const response = await getJobs({ id: null, skills });
        if (response.status === 200) {
            setJobs(response.data);
            setFilteredJobs(response.data);
        }
        setLoading(false);
    }
    useEffect(() => {
        const fetchUser = async () => {
            const response = await verifyToken();
            if (response.status === 200) {
                setUser(response.data);
            }
            setAuthLoading(false);
        }
        fetchJobs({ skills: null });
        fetchUser();
    }, [])
    const handleSkillChange = (skill) => {
        setSkills((prev) => {
            if (!prev) {
                return [skill];
            }
            return prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill];
           
        });
        // c++,python,java
    }

    const deleteSkill = (skillToDelete) => {
        setSkills((prev) => prev.filter((skill) => skill !== skillToDelete));
    }

    return (
        <div className='home'>
            <div className='container flex '>
                <h1 className='text-xl text-ultrabold p-2 ml-20 text-white'>Jobfinder</h1>
                <div className='cnt1 flex flex-row p-2'>
                <a className='border-2 border-white w-20 p-1 px-4 text-white' href="/login">Login</a>
                <a className='ml-20 w-20 bg-white p-1 px-2 text-orange-800' href="/register">Register</a>
                </div>
            </div>
           
            <div className='cnt2 h-56'>
            <input className="search m-5 h-10 px-5" type="text" placeholder="Search" value={search} onChange={handleSearch} />
            <div className='flex flex-col'>
            <div className='flex flex-row'>
            <select className='skill' onChange={(e) => handleSkillChange(e.target.value)} >
                {SKILLS.map((skill) => {
                    return <option onSelect={() => handleSkillChange(skill.value)} key={skill} value={skill.value}>{skill.label}</option>
                })}
            </select>
            {skills && skills.map((skill) => {
                return <span className="ml-10 mt-6 bg-orange-800 border-2 text-white" style={{ marginRight: '10px' }} key={skill}>{skill}<button onClick={()=>deleteSkill(skill)}>X</button></span>
            })}
            <button className="filter ml-64 w-32 text-white" disabled={skills === null} onClick={() => fetchJobs({ skills })}>Apply Filter</button>
            <button className="clear ml-10 text-orange-600" onClick={() => fetchJobs({ skills: null })}>Clear Filter</button>
            </div>
            </div>
            </div>
           
            {loading ? <h1>Loading...</h1> : filteredJobs.map((job) => {
                return (
                    
                    <div className='job'>
                    
                    <div className="job1 flex flex-row" key={job._id}>
                        <div className='flex-col ml-20 mt-5'>
                        <h1 className='text-extrabold text-xl'>{job.jobPosition}</h1>
                        
                        <p>{job.companyName}</p>
                        <p>{job.monthlySalary}</p>
                        </div>
                        <div className='flex flex-row ml-96'>
                        {job.skills.map((skill) => {
                            return <span style={{ marginRight: '10px' }} key={skill}>{skill}</span>
                        })}
                        </div>
                        <div className='cnt3 flex flex-row mt-24 text-white'>
                        <button className="view" onClick={() => navigate(`/job/${job._id}`)}>View</button>
                        {authLoading || user === null ? <button disabled>Edit</button> : <button className="edit ml-10 w-20 h-36" onClick={() => navigate(`/edit/${job._id}`)}>Edit</button>}
                        {authLoading || user === null ? <button disabled>Delete</button> : <button className="delete ml-10" onClick={() => handleDelete(job._id)}>Delete</button>}
                        </div>
                    </div>
                    </div>
                )
            })}
        </div>
    );
}


export default Home;