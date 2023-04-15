/* eslint-disable jsx-a11y/anchor-is-valid */


function Help() {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', }}>
            <h1 style={{
                margin: '1rem auto',
                fontSize: '40px',
                fontWeight: '600',
                backgroundImage: 'linear-gradient(to right, #000000, #000000)',
                color: 'transparent',
                backgroundClip: 'text',
                webkitBackgroundClip: 'text'
            }}>Guide to use MedEZ</h1>
            <div style={{ margin: '1rem auto', width: '80%', }}>
                <div style={{ margin: '1rem auto',}} className="plainBorder">

                    <p>You can begin using medEZ , once you login with your google account.<br />
                        Grant permission to your Google calender to enable dosage updates on your connected devices</p>
                    There are 3 functional sections in the navigation bar
                    <ol>
                        <li>Upload</li>
                        <li>Search</li>
                        <li>Calender</li>
                    </ol>
                </div>
                <div className="row plainBorder" style={{ textAlign: 'center' }}>
                    <h2>Upload</h2>
                    <hr style={{ border: '2px solid', height: '0', width: '50%', margin: '0 25%' }} />
                    <br />
                    <div className="column1" >
                        <img src="./1.png" alt="pic" style={{ width: '150px',borderRadius:'50%' }} />
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
                                        medEZ extracts the medicine names from the prescription once you hit submit.
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

                    <div className="column plainBorder" >
                        <h2>Search</h2>
                        <hr style={{ border: '2px solid', height: '0', width: '50%', margin: '0 25%' }} />
                        <br />
                        <div style={{ textAlign: 'center' }}>


                            <p style={{ textAlign: 'left' }}>
                                In this section , you can manually type the name of a medicine and medEZ will fetch it's best prices across the internet.
                            </p>
                        </div>
                    </div>
                  
                    <div className="column plainBorder" >
                        <h2>Calendar</h2>
                        <hr style={{ border: '2px solid', height: '0', width: '50%', margin: '0 25%' }} />
                        <br />
                        <div style={{ textAlign: 'center' }}>


                            <p style={{ textAlign: 'left' }}>
                                Use the calender to schedule updates and dosage reminders for your medication.

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Help;