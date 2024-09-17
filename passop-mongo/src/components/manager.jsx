import React, { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
    const ref = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordArray, setPasswordArray] = useState([])

    const getpaswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json();
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getpaswords()
    }, [])

    const showpassword = () => {
        alert("show password")
        setShowPassword(!showPassword); // Toggle password visibility
    }

    const addpassword = async () => {
        // alert("Password Added");
        // console.log(form)
        // Add logic for storing the password or handling the form data
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        let res = await fetch("http://localhost:3000/",{ method:"POST", headers:{"Content-Type" : "application/json"}, body:JSON.stringify({...form, id : uuidv4() })  })
        
        setform({ site: "", username: "", password: "" })
        toast('🦄 Password Saved!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,  // Bounce effect for the toast
        });
    }
    const deletepassword = async (id) => {
        console.log("del", id);
        let c = confirm("Do you really want to delete password");
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id));
    
            // Correct the typo 'locolhost' to 'localhost'
            let res = await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })  // Only send the ID for deletion
            });
    
            toast('🦄 Password Deleted!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }

    }

    
    const editpassword = (id) => {
        console.log("edit", id);
    
        // Find the password item to edit
        const passwordToEdit = passwordArray.find(i => i.id === id);
        let c = confirm("Do you really want to edit the password")
    
        if (passwordToEdit && c) {
            // Set the form state with the password to edit
            setForm(passwordToEdit);
    
            // Remove the password item from the array
            const updatedPasswords = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedPasswords);
        }
        toast('🦄 Password Edited!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,  // Bounce effect for the toast
        });
    };
    

    const handlechange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }


    const copyText = (text) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    toast('🦄 Copied to Clipboard!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,  // Bounce effect for the toast
                    });
                })
                .catch(() => {
                    toast.error('Failed to copy!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        theme: "dark",
                    });
                });
        } else {
            toast.error('Clipboard API not supported!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "dark",
            });
        }
    }


    return (
        <><ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" /><div>
                <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

                <div className="p-2 md:p-0 md:mycontainer">
                    <h1 className='text-4xl font-bold text-center'>
                        <span className='text-green-700'>&lt;</span>
                        <span>Pass</span><span className='text-green-700'>OP/&gt;</span>
                    </h1>

                    <p className='text-green-900 text-lg text-center'>Your Own password manager</p>

                    <div className="flex flex-col p-4 text-black gap-8">
                        <input
                            value={form.site}
                            onChange={handlechange}
                            placeholder="Enter the WebSite URL"
                            className='rounded-full border border-green-500 w-full p-4 py-1'
                            type="text"
                            name="site" />
                        <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                            <input
                                value={form.username}
                                onChange={handlechange}
                                placeholder="Enter UserName"
                                className='rounded-full border border-green-500 w-full p-4 py-1'
                                type="text"
                                name="username" />
                            <div className="relative">
                                <input
                                    value={form.password}
                                    onChange={handlechange}
                                    placeholder="Enter Password"
                                    className='rounded-full border border-green-500 w-full p-4 py-1'
                                    type={showPassword ? "text" : "password"} // Toggles password visibility
                                    name="password" />
                                <span ref={ref} className='absolute right-2 top-0 cursor-pointer' onClick={showpassword}>
                                    <lord-icon
                                        src={showPassword ? "https://cdn.lordicon.com/zpwnkfbk.json" : "https://cdn.lordicon.com/fmjvulyw.json"}
                                        trigger="hover"
                                        stroke="bold"
                                    ></lord-icon>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div onClick={addpassword} className="btn flex justify-center items-center mx-auto mt-3 px-7 py-2 w-fit bg-green-500 rounded-full hover:bg-green-400">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        ></lord-icon>
                        <button className='text-l'>Add Password</button>
                    </div>


                    <div className="passwords mt-3">
                        <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                        {passwordArray.length === 0 && <div>No Passwords to Show</div>}
                        {passwordArray.length !== 0 &&
                            <table className="table-auto w-full rounded-md overflow-hidden">
                                <thead className='bg-green-700 text-white'>
                                    <tr>
                                        <th className='py-2'>Site</th>
                                        <th className='py-2'>Username</th>
                                        <th className='py-2'>Password</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-100'>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index}>
                                            <td className='py-2 border border-white text-center'>
                                                <div className="flex items-center justify-center">
                                                    {/* Link to the site */}
                                                    <a href={item.site} target='_blank' rel="noopener noreferrer">{item.site}</a>

                                                    {/* Icon to copy the site URL */}
                                                    <div className="lordiconscpoy size-7 cursor-pointer" onClick={() => copyText(item.site)}>
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                            src="https://cdn.lordicon.com/wzwygmng.json"
                                                            trigger="hover"
                                                            colors="primary:#121331,secondary:#000000"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white text-center'>
                                                <div className="flex items-center justify-center">
                                                    <span>{item.username}</span>

                                                    {/* Icon to copy the username */}
                                                    <div className="lordiconscpoy size-7 cursor-pointer" onClick={() => copyText(item.username)}>
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                            src="https://cdn.lordicon.com/wzwygmng.json"
                                                            trigger="hover"
                                                            colors="primary:#121331,secondary:#000000"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white text-center'>
                                                <div className="flex items-center justify-center">
                                                    <span>{"*".repeat(item.password.length)}</span>

                                                    {/* Icon to copy the password */}
                                                    <div className="lordiconscpoy size-7 cursor-pointer" onClick={() => copyText(item.password)}>
                                                        <lord-icon
                                                            style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                            src="https://cdn.lordicon.com/wzwygmng.json"
                                                            trigger="hover"
                                                            colors="primary:#121331,secondary:#000000"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white text-center'>
                                                <span className='cursor-pointer mx-1' onClick={() => { editpassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/rsbokaso.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}
                                                    >
                                                    </lord-icon>
                                                </span>
                                                <span className='cursor-pointer mx-1' onClick={() => { deletepassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}
                                                    >
                                                    </lord-icon>
                                                </span>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>


                            </table>}
                    </div>

                </div>
            </div></>
    )
}

export default Manager;
