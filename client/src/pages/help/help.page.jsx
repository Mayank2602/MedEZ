/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOption } from "../../features/navitem/navitemSlice";


function Help() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setOption('Help'))
    },[])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', }}>
            <h1 style={{
                fontFamily:'Consolas',
                margin: '1rem auto',
                fontSize: '40px',
                fontWeight: '600',
                backgroundImage: 'linear-gradient(to right, #000000, #000000)',
                color: 'transparent',
                backgroundClip: 'text',
                webkitBackgroundClip: 'text'
            }}>Guide to use MedEZ</h1>
            <div style={{ margin: '1rem auto', width: '80%', }}>
                <div style={{ margin: '1rem auto', }} className="plainBorder">

                    <p>To get started with MedEZ, simply log in using your Google account. Once you're logged in, be sure to grant permission for your Google Calendar so that you can receive dosage updates on your connected devices.</p>
                    <p>The navigation bar in MedEZ is organized into three functional sections: Upload, Search, and Calendar.</p>
                </div>
                <div className="row plainBorder" style={{ textAlign: 'center' }}>
                    <h2>Upload</h2>
                    <hr style={{ border: '2px solid', height: '0', width: '50%', margin: '0 25%' }} />
                    <br />
                    <div className="column1" >
                        <img src="./1.png" alt="pic" style={{ width: '150px', borderRadius: '50%' }} />
                    </div>
                    <div className="column2" >
                        <div style={{ textAlign: 'center' }}>


                            <p style={{ textAlign: 'left' }}>
                                <ul>
                                    <li>
                                        Click on the upload button in your navbar. It will ask you to choose a file.
                                    </li>
                                    <li>
                                        Upload your prescription as an image or a pdf file.
                                    </li>
                                    <li>
                                        MedEZ extracts the medicine names from the prescription once you hit submit.
                                    </li>
                                    <li>
                                        Hit compare to reach the page to actually buy medicines.
                                    </li>
                                    <li>
                                        You will be given a drop down list with the names of the medicines, toggle between medicines from this list.
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="row" style={{ textAlign: 'center' }}>

                    <div className="column plainBorder" style={{ height: '350px' }}>
                        <h2>Search</h2>
                        <hr style={{ border: '2px solid', height: '0', width: '50%', margin: '0 25%' }} />
                        <br />
                        <div style={{ textAlign: 'center' }}>


                            <p style={{ textAlign: 'justify' }}>
                                This section allows you to manually enter the name of a medicine, and MedEZ will search the internet to find the best prices available. 
                                You will be provided with a list of various websites for easy comparison along with their alternatives. An overall accuracy
                                will be shown to make informed decisions.                           </p>
                        </div>
                    </div>

                    <div className="column plainBorder" style={{ height: '350px' }}>
                        <h2>Calendar</h2>
                        <hr style={{ border: '2px solid', height: '0', width: '50%', margin: '0 25%' }} />
                        <br />
                        <div style={{ textAlign: 'center' }}>


                            <p style={{ textAlign: 'justify' }}>
                            With the MedEZ calendar feature, you can schedule updates and dosage reminders for all of your medications. Simply add your medications to the calendar, set the appropriate reminders, and MedEZ will notify you when it's time to take your medication. This feature helps you stay on top of your medication schedule.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Help;