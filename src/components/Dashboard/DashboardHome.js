// import React, { useState } from 'react';
// import './DashboardHome.css';
// import logo from '../assets/bel_logo.png';

// const DashboardHome = () => {
//   const [status, setStatus] = useState({
//     serialNumber: '319143070',
//     macAddress: '00:02:c1:81:bd:ae',
//     firmwareVersion: 'v12.21.3',
//     ipAddressing: 'Static',
//     ipAddress: '172.210.140.247',
//     subnetMask: '255.255.255.0',
//     defaultGateway: '172.210.140.100',
//     dnsServer1: '0.0.0.0',
//     dnsServer2: '0.0.0.0',
//     sipVolume: 4,
//     multicastVolume: 4,
//     ringVolume: 4,
//     sensorVolume: 4,
//     volumeBoost: 'Off',
//     microphoneGain: 4,
//     sipMode: 'Enabled',
//     multicastMode: 'Disabled',
//     eventReporting: 'Disabled',
//     nightringer: 'Disabled',
//     primarySipServer: 'Not registered',
//     backupServer1: 'Not registered',
//     backupServer2: 'Not registered',
//     nightringerServer: 'Not registered',
//   });

//   return (
//     <div className="container">
//       <div className="jumbotron">
//         <img src={logo} width={400} height={125} alt="BEL Logo" />
//       </div>
//       <div className="row">
//         <div className="col">
//           <h3><b>Current Status</b></h3>
//           <table className="table">
//             <tbody>
//               <tr>
//                 <td><b>Serial Number:</b></td>
//                 <td>{status.serialNumber}</td>
//               </tr>
//               <tr>
//                 <td><b>Mac Address:</b></td>
//                 <td>{status.macAddress}</td>
//               </tr>
//               <tr>
//                 <td><b>Firmware Version:</b></td>
//                 <td>{status.firmwareVersion}</td>
//               </tr>
//               <tr>
//                 <td><b>IP Addressing:</b></td>
//                 <td>{status.ipAddressing}</td>
//               </tr>
//               <tr>
//                 <td><b>IP Address:</b></td>
//                 <td>{status.ipAddress}</td>
//               </tr>
//               <tr>
//                 <td><b>Subnet Mask:</b></td>
//                 <td>{status.subnetMask}</td>
//               </tr>
//               <tr>
//                 <td><b>Default Gateway:</b></td>
//                 <td>{status.defaultGateway}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div className="col">
//           <h3><b>Admin Settings</b></h3>
//           <table className="table">
//             <tbody>
//               <tr>
//                 <td><b>Username:</b></td>
//                 <td><input type="text" name="username" defaultValue="admin" size="25" maxLength="25" /></td>
//               </tr>
//               <tr>
//                 <td><b>Password:</b></td>
//                 <td><input type="password" name="password" size="25" maxLength="25" /></td>
//               </tr>
//               <tr>
//                 <td><b>Confirm Password:</b></td>
//                 <td><input type="password" name="password2" size="25" maxLength="25" /></td>
//               </tr>
//             </tbody>
//           </table>
//           <button className="button" type="submit" name="save">Save</button>
//           <button className="button" type="submit" name="reboot">Reboot</button>
//           <button className="button" type="button" id="toggle_help">Toggle Help</button>
//         </div>
//         <div className="col">
//           <h3><b>Import Settings</b></h3>
//           <table className="table">
//             <tbody>
//               <tr>
//                 <td><input type="file" name="import_file" /></td>
//               </tr>
//               <tr>
//                 <td><button className="button" type="submit" name="import_config">Import Config</button></td>
//               </tr>
//             </tbody>
//           </table>
//           <h3><b>Export Settings</b></h3>
//           <table className="table">
//             <tbody>
//               <tr>
//                 <td><button className="button" type="submit" name="export_config">Export Config</button></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;
import React, { useState } from 'react';
import './DashboardHome.css';
import logo from '../assets/bel_logo.png';

const DashboardHome = () => {
  const [status, setStatus] = useState({
    serialNumber: '319143070',
    macAddress: '00:02:c1:81:bd:ae',
    firmwareVersion: 'v12.21.3',
    ipAddressing: 'Static',
    ipAddress: '172.210.140.247',
    subnetMask: '255.255.255.0',
    defaultGateway: '172.210.140.100',
    dnsServer1: '0.0.0.0',
    dnsServer2: '0.0.0.0',
    sipVolume: 4,
    multicastVolume: 4,
    ringVolume: 4,
    sensorVolume: 4,
    volumeBoost: 'Off',
    microphoneGain: 4,
    sipMode: 'Enabled',
    multicastMode: 'Disabled',
    eventReporting: 'Disabled',
    nightringer: 'Disabled',
    primarySipServer: 'Not registered',
    backupServer1: 'Not registered',
    backupServer2: 'Not registered',
    nightringerServer: 'Not registered',
  });

  const [adminSettings, setAdminSettings] = useState({
    username: 'admin',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminSettings({
      ...adminSettings,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (adminSettings.password !== adminSettings.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: adminSettings.username, password: adminSettings.password }),
      });

      if (response.ok) {
        setMessage('Password changed successfully.');
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <img src={logo} width={400} height={125} alt="BEL Logo" />
      </div>
      <div className="row">
        <div className="col">
          <h3><b>Current Status</b></h3>
          <table className="table">
            <tbody>
              <tr>
                <td><b>Serial Number:</b></td>
                <td>{status.serialNumber}</td>
              </tr>
              <tr>
                <td><b>Mac Address:</b></td>
                <td>{status.macAddress}</td>
              </tr>
              <tr>
                <td><b>Firmware Version:</b></td>
                <td>{status.firmwareVersion}</td>
              </tr>
              <tr>
                <td><b>IP Addressing:</b></td>
                <td>{status.ipAddressing}</td>
              </tr>
              <tr>
                <td><b>IP Address:</b></td>
                <td>{status.ipAddress}</td>
              </tr>
              <tr>
                <td><b>Subnet Mask:</b></td>
                <td>{status.subnetMask}</td>
              </tr>
              <tr>
                <td><b>Default Gateway:</b></td>
                <td>{status.defaultGateway}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col">
          <h3><b>Admin Settings</b></h3>
          <form onSubmit={handleSubmit}>
            <table className="table">
              <tbody>
                <tr>
                  <td><b>Username:</b></td>
                  <td><input type="text" name="username" value={adminSettings.username} onChange={handleChange} size="25" maxLength="25" /></td>
                </tr>
                <tr>
                  <td><b>Password:</b></td>
                  <td><input type="password" name="password" value={adminSettings.password} onChange={handleChange} size="25" maxLength="25" /></td>
                </tr>
                <tr>
                  <td><b>Confirm Password:</b></td>
                  <td><input type="password" name="confirmPassword" value={adminSettings.confirmPassword} onChange={handleChange} size="25" maxLength="25" /></td>
                </tr>
              </tbody>
            </table>
            <button className="button" type="submit" name="save">Save</button>
          </form>
          <button className="button" type="submit" name="reboot">Reboot</button>
          <button className="button" type="button" id="toggle_help">Toggle Help</button>
          {message && <p>{message}</p>}
        </div>
        <div className="col">
          <h3><b>Import Settings</b></h3>
          <table className="table">
            <tbody>
              <tr>
                <td><input type="file" name="import_file" /></td>
              </tr>
              <tr>
                <td><button className="button" type="submit" name="import_config">Import Config</button></td>
              </tr>
            </tbody>
          </table>
          <h3><b>Export Settings</b></h3>
          <table className="table">
            <tbody>
              <tr>
                <td><button className="button" type="submit" name="export_config">Export Config</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
