import { useEffect, useState } from "react";
import {createJob} from '../services/job'
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getJobs } from "../services/job";
import image from '/create.png'


export const SKILLS =[
    {
        value: 'Javascript',
        label: 'Javascript'
    },
    {
        value: 'React',
        label: 'React'
    },
    {
        value: 'NodeJS',
        label: 'NodeJS'
    },
    {
        value: 'ExpressJS',
        label: 'ExpressJS'
    },
    {
        value: 'Python',
        label: 'Python'
    },
    {
        value: 'DevOps',
        label: 'DevOps'
    }
]

export const Create=()=>{
    const {id} = useParams();
    const [formData,setFormData]=useState({
        companyName: "",
        logoUrl: "",
        jobPosition: '',
        monthlySalary: '',
        jobType: '',
        remote: '',
        location: '',
        description: '',
        about: '',
        skills: [],
        information: '',
    })
 const[loading,setLoading] = useState(false);

    const handleChange=(e)=>{
        if(e.target.name === 'skills'){
         return setFormData({
            ...formData,
            skills : formData.skills.includes(e.target.value)? formData.skills.filter
            (skill=>skill !== e.target.value) : [...formData.skills,e.target.value]

         })
        }
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
 
    const handleSubmit= async(e)=>{
        setLoading(true)
        e.preventDefault()
        const data = {...formData}
        data.skills= data.skills.join(',');
        try{
        const jobId = id ? id: null
        const response = await createJob({data, id : jobId})
        console.log(response)
        if(response.status === 201){
            jobId ? toast.success('Updated job successfully') :toast.success('Created job successfully')
            setFormData(response.data)
        }
        else {
            toast.error('Job creation failed');
        }
        }
        catch(error){
            console.log(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const fetchJob= async()=>{
            const response = await getJobs({id})
            if(response.status === 200){
                setFormData(response.data)
            }
        }
        if(id){
            fetchJob()
        }
     },[])    

    return(
        <>
        <div className="register flex flex-row font-sans">
        <div className="flex flex-col h-12 w-full h-full">
        <h1 className="account text-4xl ml-20 font-extrabold">Add job description</h1>
            <form onSubmit={handleSubmit} className="flex flex-row p-10 gap-0 ">
                <div className="label flex flex-col">
                <label className="font-sans font-normal text-xl" htmlFor="companyName">Company Name
                   </label>
                <label className="font-sans font-normal text-xl" htmlFor="logoURL">Logo URL
                    </label>
                <label className="font-sans font-normal text-xl" htmlFor="jobPosition">Job Position
                    </label>
                <label className="font-sans font-normal text-xl" htmlFor="monthlySalary">Monthly Salary
                   </label>
                <label className="font-sans font-normal text-xl" htmlFor="jobType">Job Type
                   </label>
                <label className="font-sans font-normal text-xl" htmlFor="remote">Remote
                   </label>
                <label className="font-sans font-normal text-xl" htmlFor="location">Loaction
                   </label>
                <label className="font-sans font-normal text-xl" htmlFor="jobDescription">Job Description
                    </label>
                <label className="font-sans font-normal text-xl" htmlFor="aboutCompany">About Company
                    </label>
                <label className="font-sans font-normal text-xl" htmlFor="skillsRequired">skillsRequired
                    </label>
                <label className="font-sans font-normal text-xl" htmlFor="information">Information
                    </label>
                {id ? <button className="btn bg-orange-600 w-72 h-20 border-2 text-white" disabled={loading} type="submit">Update</button> : <button disabled={loading} className="btn border-orange-600 border-y-8 w-64 h-52 bg-orange-600 text-white "
                type="submit">Add Job</button>}
                <button className="btn1">Cancel</button>
                </div>
                <div className="input flex flex-col">
                <input className="border-black-800 border-2 h-8 w-96 " type='text' onChange={handleChange} value={formData.companyName} name='companyName' placeholder="company name" />
                            <input className="border-black-800 border-2  h-8 w-96" type="text" onChange={handleChange} value={formData.logoUrl} name='logoUrl' placeholder="Logo URL" />
                <input className="border-black-800 border-2  h-8 w-96" type="text" onChange={handleChange} value={formData.jobPosition} name='jobPosition' placeholder="Job Position" />
                <input className="border-black-800 border-2  h-8 w-96" type="text" onChange={handleChange} value={formData.monthlySalary} name='monthlySalary' placeholder="Monthly Salary" />
                <select className="border-black-800 border-2  h-8 " onChange={handleChange} type="text" value={formData.jobType} name="jobType" placeholder="Select" id="" >
                    <option>Select</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                </select>
                <select className="border-black-800 border-2  h-8" onChange={handleChange} value={formData.remote} name="remote" placeholder="Select" id="">
                    <option className="text-black-400">Select</option>
                    <option value="True">Yes</option>
                    <option value="False">No</option>
                </select>
                <input className="border-black-800 border-2  h-8 w-96" type="text" onChange={handleChange} value={formData.location} name="location" />
                <textarea className="border-black-800 border-2  h-8 w-96" onChange={handleChange} value={formData.description} name="description" id="" placeholder="textarea"/>
                <textarea className="border-black-800 border-2  h-8 w-96" onChange={handleChange} value={formData.about} name="about" id="" placeholder="textarea"/>
                <select className="border-black-800 border-2  h-8 w-96" onChange={handleChange} value={formData.skills} name="skills" id="" multiple>
                    <option>Select</option>
                    {SKILLS.map((skill, idx) => (<option key={idx} value={skill.value}>{skill.label}</option>))}
                </select>
                <input className="border-black-800 border-2  h-8 w-96" type="text" onChange={handleChange} value={formData.information} name="information" placeholder="Information" />
                </div>
            </form>
            </div>
            <div className=" ml-80">
            <h1 className="absolute text-white text-4xl ml-12 mt-20">Recruiters add job details here</h1>
                <img className="w-screen h-screen" src={image} alt='create'/>
            </div>
            </div>
        </>
    )
}
