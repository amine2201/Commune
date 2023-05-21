import Navbar from "./Navbar";

const Status = ()=>{
    
    return (
        <>
  <Navbar isAuthenticated={true}/>
  <div className="relative overflow-x-auto py-10">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3 rounded-l-lg">
                      File name
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Date
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-r-lg">
                      Status
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    FileName
                  </th>
                  <td className="px-6 py-4">
                      5/15/23
                  </td>
                  <td className="px-6 py-4">
                      Pending
                  </td>
              </tr>
             
          
          </tbody>
         
      </table>
  </div>
  </>
    )
  }
  export default Status;



