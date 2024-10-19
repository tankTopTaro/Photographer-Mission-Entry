import axios from 'axios'
import {QRCodeSVG} from 'qrcode.react'
import { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'

const App = () => {
  const [availableRemotes, setAvailableRemotes] = useState([])
  const salt = process.env.REACT_APP_SALT

  const fetchAdmin = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin`)
          setAvailableRemotes(response.data.availableRemotes)
      } catch (error) {
          console.error('Error fetching Admin', error)
      }
  }

  useEffect(() => {
      fetchAdmin()
  }, [])

  const leastRemote = availableRemotes.length > 0 ? availableRemotes[0] : null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Create Album</h1>
        {leastRemote ? (
        <div className="mb-8 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">Remote ID: {leastRemote.id}</h2>
          {/* Generate the token using the least remote ID */}
          {(() => {
            const token = CryptoJS.SHA256(salt + leastRemote.id).toString(CryptoJS.enc.Hex);
            const url = `http://photographer-mission.io/photographer/remote/${leastRemote.id}/${token}`;

            return (
              <>
                <QRCodeSVG value={url} size={200} />
                <p className="text-center mt-8">
                  Scan this QR code to create an album:
                  <br />
                  or
                  <br />
                  <span className="font-medium text-blue-500"><a href={url}>Create Album</a></span>
                </p>
              </>
            );
          })()}
        </div>
      ) : (
        <p>Loading remotes...</p>
      )}
    </div>
  )
}

export default App